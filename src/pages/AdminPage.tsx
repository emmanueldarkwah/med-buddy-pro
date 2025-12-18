import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, Pill, BookOpen, AlertTriangle, GraduationCap, Shield, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';

type AdminDrug = {
  id: string;
  name: string;
  generic_name: string | null;
  drug_class: string | null;
  uses: string[] | null;
  mechanism: string | null;
  side_effects: string[] | null;
  contraindications: string[] | null;
  dosage: string | null;
  administration: string | null;
  interactions: string[] | null;
};

type AdminQuizQuestion = {
  id: string;
  quiz_category: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
};

type AdminCaseStudy = {
  id: string;
  title: string;
  category: string;
  patient_info: string;
  presentation: string;
  questions: any;
};

type AdminSafetyAlert = {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'warning';
  description: string;
  details: string | null;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  
  const [drugs, setDrugs] = useState<AdminDrug[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<AdminQuizQuestion[]>([]);
  const [caseStudies, setCaseStudies] = useState<AdminCaseStudy[]>([]);
  const [safetyAlerts, setSafetyAlerts] = useState<AdminSafetyAlert[]>([]);
  
  const [editingDrug, setEditingDrug] = useState<Partial<AdminDrug> | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<Partial<AdminQuizQuestion> | null>(null);
  const [editingCase, setEditingCase] = useState<Partial<AdminCaseStudy> | null>(null);
  const [editingAlert, setEditingAlert] = useState<Partial<AdminSafetyAlert> | null>(null);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('drugs');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [isAdmin, adminLoading, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    const [drugsRes, quizRes, casesRes, alertsRes] = await Promise.all([
      supabase.from('admin_drugs').select('*').order('name'),
      supabase.from('admin_quiz_questions').select('*').order('quiz_category'),
      supabase.from('admin_case_studies').select('*').order('title'),
      supabase.from('admin_safety_alerts').select('*').order('severity'),
    ]);

    if (drugsRes.data) setDrugs(drugsRes.data);
    if (quizRes.data) setQuizQuestions(quizRes.data);
    if (casesRes.data) setCaseStudies(casesRes.data);
    if (alertsRes.data) setSafetyAlerts(alertsRes.data as AdminSafetyAlert[]);
  };

  // Drug CRUD
  const saveDrug = async () => {
    if (!editingDrug?.name) {
      toast.error('Drug name is required');
      return;
    }

    const drugData = {
      name: editingDrug.name,
      generic_name: editingDrug.generic_name || null,
      drug_class: editingDrug.drug_class || null,
      uses: editingDrug.uses || [],
      mechanism: editingDrug.mechanism || null,
      side_effects: editingDrug.side_effects || [],
      contraindications: editingDrug.contraindications || [],
      dosage: editingDrug.dosage || null,
      administration: editingDrug.administration || null,
      interactions: editingDrug.interactions || [],
    };

    if (editingDrug.id) {
      const { error } = await supabase
        .from('admin_drugs')
        .update(drugData)
        .eq('id', editingDrug.id);
      if (error) {
        toast.error('Failed to update drug');
        return;
      }
      toast.success('Drug updated');
    } else {
      const { error } = await supabase.from('admin_drugs').insert(drugData);
      if (error) {
        toast.error('Failed to add drug');
        return;
      }
      toast.success('Drug added');
    }

    setEditingDrug(null);
    setDialogOpen(false);
    fetchAllData();
  };

  const deleteDrug = async (id: string) => {
    const { error } = await supabase.from('admin_drugs').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete drug');
      return;
    }
    toast.success('Drug deleted');
    fetchAllData();
  };

  // Quiz CRUD
  const saveQuiz = async () => {
    if (!editingQuiz?.question || !editingQuiz?.quiz_category) {
      toast.error('Question and category are required');
      return;
    }

    const quizData = {
      quiz_category: editingQuiz.quiz_category,
      question: editingQuiz.question,
      options: editingQuiz.options || [],
      correct_answer: editingQuiz.correct_answer || 0,
      explanation: editingQuiz.explanation || null,
    };

    if (editingQuiz.id) {
      const { error } = await supabase
        .from('admin_quiz_questions')
        .update(quizData)
        .eq('id', editingQuiz.id);
      if (error) {
        toast.error('Failed to update question');
        return;
      }
      toast.success('Question updated');
    } else {
      const { error } = await supabase.from('admin_quiz_questions').insert(quizData);
      if (error) {
        toast.error('Failed to add question');
        return;
      }
      toast.success('Question added');
    }

    setEditingQuiz(null);
    setDialogOpen(false);
    fetchAllData();
  };

  const deleteQuiz = async (id: string) => {
    const { error } = await supabase.from('admin_quiz_questions').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete question');
      return;
    }
    toast.success('Question deleted');
    fetchAllData();
  };

  // Case Study CRUD
  const saveCase = async () => {
    if (!editingCase?.title || !editingCase?.category) {
      toast.error('Title and category are required');
      return;
    }

    const caseData = {
      title: editingCase.title,
      category: editingCase.category,
      patient_info: editingCase.patient_info || '',
      presentation: editingCase.presentation || '',
      questions: editingCase.questions || [],
    };

    if (editingCase.id) {
      const { error } = await supabase
        .from('admin_case_studies')
        .update(caseData)
        .eq('id', editingCase.id);
      if (error) {
        toast.error('Failed to update case study');
        return;
      }
      toast.success('Case study updated');
    } else {
      const { error } = await supabase.from('admin_case_studies').insert(caseData);
      if (error) {
        toast.error('Failed to add case study');
        return;
      }
      toast.success('Case study added');
    }

    setEditingCase(null);
    setDialogOpen(false);
    fetchAllData();
  };

  const deleteCase = async (id: string) => {
    const { error } = await supabase.from('admin_case_studies').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete case study');
      return;
    }
    toast.success('Case study deleted');
    fetchAllData();
  };

  // Safety Alert CRUD
  const saveAlert = async () => {
    if (!editingAlert?.title || !editingAlert?.severity) {
      toast.error('Title and severity are required');
      return;
    }

    const alertData = {
      title: editingAlert.title,
      severity: editingAlert.severity,
      description: editingAlert.description || '',
      details: editingAlert.details || null,
    };

    if (editingAlert.id) {
      const { error } = await supabase
        .from('admin_safety_alerts')
        .update(alertData)
        .eq('id', editingAlert.id);
      if (error) {
        toast.error('Failed to update alert');
        return;
      }
      toast.success('Alert updated');
    } else {
      const { error } = await supabase.from('admin_safety_alerts').insert(alertData);
      if (error) {
        toast.error('Failed to add alert');
        return;
      }
      toast.success('Alert added');
    }

    setEditingAlert(null);
    setDialogOpen(false);
    fetchAllData();
  };

  const deleteAlert = async (id: string) => {
    const { error } = await supabase.from('admin_safety_alerts').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete alert');
      return;
    }
    toast.success('Alert deleted');
    fetchAllData();
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-destructive">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Manage app content</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="drugs" className="text-xs">
              <Pill className="w-4 h-4 mr-1" />
              Drugs
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="text-xs">
              <GraduationCap className="w-4 h-4 mr-1" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="cases" className="text-xs">
              <BookOpen className="w-4 h-4 mr-1" />
              Cases
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Alerts
            </TabsTrigger>
          </TabsList>

          {/* Drugs Tab */}
          <TabsContent value="drugs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Drugs ({drugs.length})</h2>
              <Dialog open={dialogOpen && activeTab === 'drugs'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setEditingDrug(null);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setEditingDrug({})}>
                    <Plus className="w-4 h-4 mr-1" /> Add Drug
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingDrug?.id ? 'Edit Drug' : 'Add Drug'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        value={editingDrug?.name || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, name: e.target.value })}
                        placeholder="Drug name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Generic Name</label>
                      <Input
                        value={editingDrug?.generic_name || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, generic_name: e.target.value })}
                        placeholder="Generic name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Drug Class</label>
                      <Input
                        value={editingDrug?.drug_class || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, drug_class: e.target.value })}
                        placeholder="Drug class"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mechanism</label>
                      <Textarea
                        value={editingDrug?.mechanism || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, mechanism: e.target.value })}
                        placeholder="Mechanism of action"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dosage</label>
                      <Textarea
                        value={editingDrug?.dosage || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, dosage: e.target.value })}
                        placeholder="Dosage information"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Uses (comma-separated)</label>
                      <Input
                        value={editingDrug?.uses?.join(', ') || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, uses: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        placeholder="Use 1, Use 2, Use 3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Side Effects (comma-separated)</label>
                      <Input
                        value={editingDrug?.side_effects?.join(', ') || ''}
                        onChange={(e) => setEditingDrug({ ...editingDrug, side_effects: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        placeholder="Effect 1, Effect 2"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => { setEditingDrug(null); setDialogOpen(false); }}>
                        Cancel
                      </Button>
                      <Button onClick={saveDrug}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2">
                {drugs.map((drug) => (
                  <Card key={drug.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{drug.name}</h3>
                        <p className="text-xs text-muted-foreground">{drug.drug_class || 'No class'}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditingDrug(drug); setDialogOpen(true); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteDrug(drug.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {drugs.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No drugs added yet</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Quiz Questions ({quizQuestions.length})</h2>
              <Dialog open={dialogOpen && activeTab === 'quizzes'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setEditingQuiz(null);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setEditingQuiz({ options: ['', '', '', ''], correct_answer: 0 })}>
                    <Plus className="w-4 h-4 mr-1" /> Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingQuiz?.id ? 'Edit Question' : 'Add Question'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Category *</label>
                      <Input
                        value={editingQuiz?.quiz_category || ''}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, quiz_category: e.target.value })}
                        placeholder="e.g., Pharmacology, Therapeutics"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Question *</label>
                      <Textarea
                        value={editingQuiz?.question || ''}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, question: e.target.value })}
                        placeholder="Enter the question"
                      />
                    </div>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i}>
                        <label className="text-sm font-medium">Option {i + 1}</label>
                        <Input
                          value={editingQuiz?.options?.[i] || ''}
                          onChange={(e) => {
                            const newOptions = [...(editingQuiz?.options || ['', '', '', ''])];
                            newOptions[i] = e.target.value;
                            setEditingQuiz({ ...editingQuiz, options: newOptions });
                          }}
                          placeholder={`Option ${i + 1}`}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-sm font-medium">Correct Answer (0-3)</label>
                      <Select
                        value={String(editingQuiz?.correct_answer || 0)}
                        onValueChange={(v) => setEditingQuiz({ ...editingQuiz, correct_answer: parseInt(v) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map((i) => (
                            <SelectItem key={i} value={String(i)}>Option {i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Explanation</label>
                      <Textarea
                        value={editingQuiz?.explanation || ''}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, explanation: e.target.value })}
                        placeholder="Why is this correct?"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => { setEditingQuiz(null); setDialogOpen(false); }}>
                        Cancel
                      </Button>
                      <Button onClick={saveQuiz}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2">
                {quizQuestions.map((q) => (
                  <Card key={q.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-2">
                        <p className="text-xs text-primary font-medium mb-1">{q.quiz_category}</p>
                        <p className="text-sm line-clamp-2">{q.question}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditingQuiz(q); setDialogOpen(true); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteQuiz(q.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {quizQuestions.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No questions added yet</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Case Studies ({caseStudies.length})</h2>
              <Dialog open={dialogOpen && activeTab === 'cases'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setEditingCase(null);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setEditingCase({})}>
                    <Plus className="w-4 h-4 mr-1" /> Add Case
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCase?.id ? 'Edit Case' : 'Add Case'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title *</label>
                      <Input
                        value={editingCase?.title || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                        placeholder="Case title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category *</label>
                      <Input
                        value={editingCase?.category || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                        placeholder="e.g., Cardiology, Infectious Disease"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Patient Info</label>
                      <Textarea
                        value={editingCase?.patient_info || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, patient_info: e.target.value })}
                        placeholder="Patient demographics and history"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Presentation</label>
                      <Textarea
                        value={editingCase?.presentation || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, presentation: e.target.value })}
                        placeholder="Clinical presentation"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => { setEditingCase(null); setDialogOpen(false); }}>
                        Cancel
                      </Button>
                      <Button onClick={saveCase}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2">
                {caseStudies.map((c) => (
                  <Card key={c.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{c.title}</h3>
                        <p className="text-xs text-muted-foreground">{c.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditingCase(c); setDialogOpen(true); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteCase(c.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {caseStudies.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No case studies added yet</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Safety Alerts ({safetyAlerts.length})</h2>
              <Dialog open={dialogOpen && activeTab === 'alerts'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setEditingAlert(null);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => setEditingAlert({ severity: 'warning' })}>
                    <Plus className="w-4 h-4 mr-1" /> Add Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingAlert?.id ? 'Edit Alert' : 'Add Alert'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title *</label>
                      <Input
                        value={editingAlert?.title || ''}
                        onChange={(e) => setEditingAlert({ ...editingAlert, title: e.target.value })}
                        placeholder="Alert title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Severity *</label>
                      <Select
                        value={editingAlert?.severity || 'warning'}
                        onValueChange={(v) => setEditingAlert({ ...editingAlert, severity: v as 'critical' | 'high' | 'warning' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={editingAlert?.description || ''}
                        onChange={(e) => setEditingAlert({ ...editingAlert, description: e.target.value })}
                        placeholder="Brief description"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Details</label>
                      <Textarea
                        value={editingAlert?.details || ''}
                        onChange={(e) => setEditingAlert({ ...editingAlert, details: e.target.value })}
                        placeholder="Detailed information"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => { setEditingAlert(null); setDialogOpen(false); }}>
                        Cancel
                      </Button>
                      <Button onClick={saveAlert}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-2">
                {safetyAlerts.map((a) => (
                  <Card key={a.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            a.severity === 'critical' ? 'bg-destructive/20 text-destructive' :
                            a.severity === 'high' ? 'bg-orange-500/20 text-orange-600' :
                            'bg-yellow-500/20 text-yellow-600'
                          }`}>
                            {a.severity}
                          </span>
                          <h3 className="font-medium">{a.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditingAlert(a); setDialogOpen(true); }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteAlert(a.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {safetyAlerts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No alerts added yet</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
