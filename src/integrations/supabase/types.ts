export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_case_studies: {
        Row: {
          category: string
          created_at: string | null
          id: string
          patient_info: string
          presentation: string
          questions: Json
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          patient_info: string
          presentation: string
          questions: Json
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          patient_info?: string
          presentation?: string
          questions?: Json
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_drugs: {
        Row: {
          administration: string | null
          contraindications: string[] | null
          created_at: string | null
          dosage: string | null
          drug_class: string | null
          generic_name: string | null
          id: string
          interactions: string[] | null
          mechanism: string | null
          name: string
          side_effects: string[] | null
          updated_at: string | null
          uses: string[] | null
        }
        Insert: {
          administration?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          dosage?: string | null
          drug_class?: string | null
          generic_name?: string | null
          id?: string
          interactions?: string[] | null
          mechanism?: string | null
          name: string
          side_effects?: string[] | null
          updated_at?: string | null
          uses?: string[] | null
        }
        Update: {
          administration?: string | null
          contraindications?: string[] | null
          created_at?: string | null
          dosage?: string | null
          drug_class?: string | null
          generic_name?: string | null
          id?: string
          interactions?: string[] | null
          mechanism?: string | null
          name?: string
          side_effects?: string[] | null
          updated_at?: string | null
          uses?: string[] | null
        }
        Relationships: []
      }
      admin_quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string | null
          explanation: string | null
          id: string
          options: string[]
          question: string
          quiz_category: string
          updated_at: string | null
        }
        Insert: {
          correct_answer: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          options: string[]
          question: string
          quiz_category: string
          updated_at?: string | null
        }
        Update: {
          correct_answer?: number
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: string[]
          question?: string
          quiz_category?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_safety_alerts: {
        Row: {
          created_at: string | null
          description: string
          details: string | null
          id: string
          severity: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          details?: string | null
          id?: string
          severity: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          details?: string | null
          id?: string
          severity?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_bookmarked: boolean | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_bookmarked?: boolean | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_bookmarked?: boolean | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_daily_challenges: {
        Row: {
          challenge_date: string
          completed: boolean | null
          created_at: string | null
          id: string
          questions_answered: number
          score: number
          user_id: string
        }
        Insert: {
          challenge_date: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          questions_answered: number
          score: number
          user_id: string
        }
        Update: {
          challenge_date?: string
          completed?: boolean | null
          created_at?: string | null
          id?: string
          questions_answered?: number
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      user_drug_notes: {
        Row: {
          created_at: string | null
          drug_id: string
          id: string
          note: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          drug_id: string
          id?: string
          note?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          drug_id?: string
          id?: string
          note?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_flashcard_progress: {
        Row: {
          drug_id: string
          id: string
          known_card_indices: number[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          drug_id: string
          id?: string
          known_card_indices?: number[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          drug_id?: string
          id?: string
          known_card_indices?: number[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          avatar_url: string | null
          calculator_uses: number | null
          correct_answers: number | null
          created_at: string | null
          id: string
          interaction_checks: number | null
          is_dark_mode: boolean | null
          last_study_date: string | null
          study_streak: number | null
          theme: string | null
          total_questions_answered: number | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          calculator_uses?: number | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          interaction_checks?: number | null
          is_dark_mode?: boolean | null
          last_study_date?: string | null
          study_streak?: number | null
          theme?: string | null
          total_questions_answered?: number | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          calculator_uses?: number | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          interaction_checks?: number | null
          is_dark_mode?: boolean | null
          last_study_date?: string | null
          study_streak?: number | null
          theme?: string | null
          total_questions_answered?: number | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      user_quiz_results: {
        Row: {
          completed_at: string | null
          id: string
          quiz_id: string
          score: number
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quiz_id: string
          score: number
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          quiz_id?: string
          score?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
