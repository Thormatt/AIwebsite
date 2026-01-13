


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."calculate_dimension_scores"("session_uuid" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_object_agg(dimension, avg_score)
    INTO result
    FROM (
        SELECT
            r.dimension,
            ROUND(AVG(r.response_value::numeric), 2) as avg_score
        FROM assessment_responses r
        JOIN participants p ON r.participant_id = p.id
        WHERE p.session_id = session_uuid
        AND r.dimension IS NOT NULL
        GROUP BY r.dimension
    ) scores;

    RETURN result;
END;
$$;


ALTER FUNCTION "public"."calculate_dimension_scores"("session_uuid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_completion_rate"("session_uuid" "uuid") RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    total_participants INTEGER;
    completed_participants INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_participants
    FROM participants
    WHERE session_id = session_uuid;

    SELECT COUNT(*) INTO completed_participants
    FROM participants
    WHERE session_id = session_uuid
    AND completed_at IS NOT NULL;

    IF total_participants = 0 THEN
        RETURN 0;
    END IF;

    RETURN ROUND((completed_participants::numeric / total_participants::numeric) * 100, 2);
END;
$$;


ALTER FUNCTION "public"."get_completion_rate"("session_uuid" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."assessment_responses" (
    "id" bigint NOT NULL,
    "participant_id" "uuid",
    "question_key" "text" NOT NULL,
    "dimension" "text",
    "response_value" "text" NOT NULL,
    "response_text" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."assessment_responses" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."assessment_responses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."assessment_responses_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."assessment_responses_id_seq" OWNED BY "public"."assessment_responses"."id";



CREATE TABLE IF NOT EXISTS "public"."assessment_sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "organization_id" "uuid",
    "type" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "is_premium" boolean DEFAULT false,
    "title" "text",
    "description" "text",
    "access_code" "text",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "expires_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    CONSTRAINT "assessment_sessions_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'in_progress'::"text", 'completed'::"text", 'archived'::"text"]))),
    CONSTRAINT "assessment_sessions_type_check" CHECK (("type" = ANY (ARRAY['individual'::"text", 'consensus'::"text", 'pulse'::"text"])))
);


ALTER TABLE "public"."assessment_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "industry" "text",
    "employee_count" integer,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."participants" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "session_id" "uuid",
    "user_id" "uuid",
    "email" "text",
    "name" "text",
    "role" "text",
    "department" "text",
    "level" "text",
    "tenure" "text",
    "invited_at" timestamp with time zone DEFAULT "now"(),
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "ip_address" "inet",
    "user_agent" "text"
);


ALTER TABLE "public"."participants" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "key" "text" NOT NULL,
    "text" "text" NOT NULL,
    "dimension" "text" NOT NULL,
    "target_audience" "text"[] DEFAULT ARRAY['individual'::"text", 'consensus'::"text", 'pulse'::"text"],
    "question_type" "text" DEFAULT 'likert'::"text",
    "options" "jsonb",
    "order_index" integer,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "questions_dimension_check" CHECK (("dimension" = ANY (ARRAY['Data'::"text", 'Governance'::"text", 'Technical'::"text", 'Business'::"text", 'Culture'::"text"]))),
    CONSTRAINT "questions_question_type_check" CHECK (("question_type" = ANY (ARRAY['likert'::"text", 'yes_no'::"text", 'multiple_choice'::"text", 'text'::"text"])))
);


ALTER TABLE "public"."questions" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."session_overview" AS
 SELECT "s"."id",
    "s"."organization_id",
    "s"."type",
    "s"."status",
    "s"."title",
    "s"."created_at",
    "o"."name" AS "organization_name",
    "count"(DISTINCT "p"."id") AS "total_participants",
    "count"(DISTINCT
        CASE
            WHEN ("p"."completed_at" IS NOT NULL) THEN "p"."id"
            ELSE NULL::"uuid"
        END) AS "completed_participants",
    "public"."get_completion_rate"("s"."id") AS "completion_rate"
   FROM (("public"."assessment_sessions" "s"
     LEFT JOIN "public"."organizations" "o" ON (("s"."organization_id" = "o"."id")))
     LEFT JOIN "public"."participants" "p" ON (("s"."id" = "p"."session_id")))
  GROUP BY "s"."id", "s"."organization_id", "s"."type", "s"."status", "s"."title", "s"."created_at", "o"."name";


ALTER VIEW "public"."session_overview" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."session_results" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "session_id" "uuid",
    "overall_score" numeric(5,2),
    "completion_rate" numeric(5,2),
    "total_participants" integer,
    "dimension_scores" "jsonb",
    "department_breakdown" "jsonb",
    "level_breakdown" "jsonb",
    "risk_score" numeric(5,2),
    "risk_level" "text",
    "consensus_variance" "jsonb",
    "computed_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."session_results" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."survey_responses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "respondent_name" "text" NOT NULL,
    "respondent_title" "text" NOT NULL,
    "respondent_company" "text" NOT NULL,
    "respondent_email" "text",
    "responses" "jsonb" NOT NULL,
    "results" "jsonb" NOT NULL,
    "session_id" "uuid"
);


ALTER TABLE "public"."survey_responses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."survey_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "session_code" "text" NOT NULL,
    "company_name" "text" NOT NULL,
    "created_by" "text" DEFAULT 'Thor'::"text",
    "status" "text" DEFAULT 'active'::"text",
    "expires_at" timestamp with time zone,
    "notes" "text",
    "responses_count" integer DEFAULT 0,
    CONSTRAINT "survey_sessions_status_check" CHECK (("status" = ANY (ARRAY['active'::"text", 'completed'::"text", 'expired'::"text"])))
);


ALTER TABLE "public"."survey_sessions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."assessment_responses" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."assessment_responses_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."assessment_responses"
    ADD CONSTRAINT "assessment_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."assessment_sessions"
    ADD CONSTRAINT "assessment_sessions_access_code_key" UNIQUE ("access_code");



ALTER TABLE ONLY "public"."assessment_sessions"
    ADD CONSTRAINT "assessment_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."session_results"
    ADD CONSTRAINT "session_results_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."session_results"
    ADD CONSTRAINT "session_results_session_id_key" UNIQUE ("session_id");



ALTER TABLE ONLY "public"."survey_responses"
    ADD CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."survey_sessions"
    ADD CONSTRAINT "survey_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."survey_sessions"
    ADD CONSTRAINT "survey_sessions_session_code_key" UNIQUE ("session_code");



CREATE INDEX "idx_participants_department" ON "public"."participants" USING "btree" ("department");



CREATE INDEX "idx_participants_email" ON "public"."participants" USING "btree" ("email");



CREATE INDEX "idx_participants_session" ON "public"."participants" USING "btree" ("session_id");



CREATE INDEX "idx_responses_dimension" ON "public"."assessment_responses" USING "btree" ("dimension");



CREATE INDEX "idx_responses_participant" ON "public"."assessment_responses" USING "btree" ("participant_id");



CREATE INDEX "idx_responses_question" ON "public"."assessment_responses" USING "btree" ("question_key");



CREATE INDEX "idx_results_session" ON "public"."session_results" USING "btree" ("session_id");



CREATE INDEX "idx_sessions_access_code" ON "public"."assessment_sessions" USING "btree" ("access_code");



CREATE INDEX "idx_sessions_org" ON "public"."assessment_sessions" USING "btree" ("organization_id");



CREATE INDEX "idx_sessions_type" ON "public"."assessment_sessions" USING "btree" ("type");



ALTER TABLE ONLY "public"."assessment_responses"
    ADD CONSTRAINT "assessment_responses_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."assessment_sessions"
    ADD CONSTRAINT "assessment_sessions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."assessment_sessions"
    ADD CONSTRAINT "assessment_sessions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."assessment_sessions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."session_results"
    ADD CONSTRAINT "session_results_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."assessment_sessions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."survey_responses"
    ADD CONSTRAINT "survey_responses_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."survey_sessions"("id");



CREATE POLICY "Allow authenticated reads" ON "public"."survey_responses" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow authenticated to delete sessions" ON "public"."survey_sessions" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow authenticated to update sessions" ON "public"."survey_sessions" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow public inserts to sessions" ON "public"."survey_sessions" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public inserts with valid session" ON "public"."survey_responses" FOR INSERT WITH CHECK (("session_id" IN ( SELECT "survey_sessions"."id"
   FROM "public"."survey_sessions"
  WHERE (("survey_sessions"."status" = 'active'::"text") AND (("survey_sessions"."expires_at" IS NULL) OR ("survey_sessions"."expires_at" > "now"()))))));



CREATE POLICY "Allow public to read active sessions" ON "public"."survey_sessions" FOR SELECT USING ((("status" = 'active'::"text") AND (("expires_at" IS NULL) OR ("expires_at" > "now"()))));



CREATE POLICY "Anonymous can insert responses" ON "public"."assessment_responses" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Anonymous can view questions" ON "public"."questions" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Anonymous can view sessions by access code" ON "public"."assessment_sessions" FOR SELECT TO "anon" USING (("access_code" IS NOT NULL));



CREATE POLICY "Anyone authenticated can create organizations" ON "public"."organizations" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Anyone authenticated can update organizations" ON "public"."organizations" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Anyone authenticated can view organizations" ON "public"."organizations" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Anyone can insert participant" ON "public"."participants" FOR INSERT WITH CHECK (true);



CREATE POLICY "Participants can insert own responses" ON "public"."assessment_responses" FOR INSERT WITH CHECK (true);



CREATE POLICY "Questions are publicly readable" ON "public"."questions" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Users can create sessions" ON "public"."assessment_sessions" FOR INSERT WITH CHECK (true);



CREATE POLICY "Users can update own sessions" ON "public"."assessment_sessions" FOR UPDATE USING (("created_by" = "auth"."uid"())) WITH CHECK (("created_by" = "auth"."uid"()));



CREATE POLICY "Users can view own sessions" ON "public"."assessment_sessions" FOR SELECT USING (("created_by" = "auth"."uid"()));



CREATE POLICY "Users can view participants in their sessions" ON "public"."participants" FOR SELECT USING ((("session_id" IN ( SELECT "assessment_sessions"."id"
   FROM "public"."assessment_sessions"
  WHERE ("assessment_sessions"."created_by" = "auth"."uid"()))) OR ("user_id" = "auth"."uid"())));



CREATE POLICY "Users can view responses for their sessions" ON "public"."assessment_responses" FOR SELECT USING ((("participant_id" IN ( SELECT "p"."id"
   FROM ("public"."participants" "p"
     JOIN "public"."assessment_sessions" "s" ON (("p"."session_id" = "s"."id")))
  WHERE ("s"."created_by" = "auth"."uid"()))) OR ("participant_id" IN ( SELECT "participants"."id"
   FROM "public"."participants"
  WHERE ("participants"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view results for their sessions" ON "public"."session_results" FOR SELECT USING (("session_id" IN ( SELECT "assessment_sessions"."id"
   FROM "public"."assessment_sessions"
  WHERE ("assessment_sessions"."created_by" = "auth"."uid"()))));



ALTER TABLE "public"."assessment_responses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."assessment_sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."participants" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."session_results" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."survey_responses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."survey_sessions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."calculate_dimension_scores"("session_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_dimension_scores"("session_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_dimension_scores"("session_uuid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_completion_rate"("session_uuid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_completion_rate"("session_uuid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_completion_rate"("session_uuid" "uuid") TO "service_role";


















GRANT ALL ON TABLE "public"."assessment_responses" TO "anon";
GRANT ALL ON TABLE "public"."assessment_responses" TO "authenticated";
GRANT ALL ON TABLE "public"."assessment_responses" TO "service_role";



GRANT ALL ON SEQUENCE "public"."assessment_responses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."assessment_responses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."assessment_responses_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."assessment_sessions" TO "anon";
GRANT ALL ON TABLE "public"."assessment_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."assessment_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."participants" TO "anon";
GRANT ALL ON TABLE "public"."participants" TO "authenticated";
GRANT ALL ON TABLE "public"."participants" TO "service_role";



GRANT ALL ON TABLE "public"."questions" TO "anon";
GRANT ALL ON TABLE "public"."questions" TO "authenticated";
GRANT ALL ON TABLE "public"."questions" TO "service_role";



GRANT ALL ON TABLE "public"."session_overview" TO "anon";
GRANT ALL ON TABLE "public"."session_overview" TO "authenticated";
GRANT ALL ON TABLE "public"."session_overview" TO "service_role";



GRANT ALL ON TABLE "public"."session_results" TO "anon";
GRANT ALL ON TABLE "public"."session_results" TO "authenticated";
GRANT ALL ON TABLE "public"."session_results" TO "service_role";



GRANT ALL ON TABLE "public"."survey_responses" TO "anon";
GRANT ALL ON TABLE "public"."survey_responses" TO "authenticated";
GRANT ALL ON TABLE "public"."survey_responses" TO "service_role";



GRANT ALL ON TABLE "public"."survey_sessions" TO "anon";
GRANT ALL ON TABLE "public"."survey_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."survey_sessions" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































RESET ALL;

