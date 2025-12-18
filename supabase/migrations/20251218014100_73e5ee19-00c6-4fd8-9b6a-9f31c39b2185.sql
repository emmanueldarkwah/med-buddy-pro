-- Create app_role enum for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create chat_messages table for PharmaBot history
CREATE TABLE public.chat_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role text NOT NULL CHECK (role IN ('user', 'assistant')),
    content text NOT NULL,
    is_bookmarked boolean DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_messages
CREATE POLICY "Users can view own messages"
ON public.chat_messages
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
ON public.chat_messages
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
ON public.chat_messages
FOR DELETE
USING (auth.uid() = user_id);

-- Create admin-managed content tables
CREATE TABLE public.admin_drugs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    generic_name text,
    drug_class text,
    uses text[],
    mechanism text,
    side_effects text[],
    contraindications text[],
    dosage text,
    administration text,
    interactions text[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_drugs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view drugs"
ON public.admin_drugs
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert drugs"
ON public.admin_drugs
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update drugs"
ON public.admin_drugs
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete drugs"
ON public.admin_drugs
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin-managed quiz questions table
CREATE TABLE public.admin_quiz_questions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_category text NOT NULL,
    question text NOT NULL,
    options text[] NOT NULL,
    correct_answer integer NOT NULL,
    explanation text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz questions"
ON public.admin_quiz_questions
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert quiz questions"
ON public.admin_quiz_questions
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update quiz questions"
ON public.admin_quiz_questions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete quiz questions"
ON public.admin_quiz_questions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin-managed case studies table
CREATE TABLE public.admin_case_studies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    category text NOT NULL,
    patient_info text NOT NULL,
    presentation text NOT NULL,
    questions jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view case studies"
ON public.admin_case_studies
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert case studies"
ON public.admin_case_studies
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies"
ON public.admin_case_studies
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies"
ON public.admin_case_studies
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin-managed safety alerts table
CREATE TABLE public.admin_safety_alerts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    severity text NOT NULL CHECK (severity IN ('critical', 'high', 'warning')),
    description text NOT NULL,
    details text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_safety_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view safety alerts"
ON public.admin_safety_alerts
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert safety alerts"
ON public.admin_safety_alerts
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update safety alerts"
ON public.admin_safety_alerts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete safety alerts"
ON public.admin_safety_alerts
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));