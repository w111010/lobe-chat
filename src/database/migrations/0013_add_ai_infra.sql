CREATE TABLE "ai_models" (
	"id" varchar(150) NOT NULL,
	"display_name" varchar(200),
	"description" text,
	"organization" varchar(100),
	"type" varchar(20) DEFAULT 'chat' NOT NULL,
	"user_id" text NOT NULL,
	"pricing" jsonb,
	"parameters" jsonb DEFAULT '{}'::jsonb,
	"config" jsonb,
	"abilities" jsonb DEFAULT '{}'::jsonb,
	"context_window_tokens" integer,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_models_id_user_id_pk" PRIMARY KEY("id","user_id")
);
--> statement-breakpoint
CREATE TABLE "ai_providers" (
	"id" varchar(64) NOT NULL,
	"name" text,
	"user_id" text NOT NULL,
	"sort" integer,
	"enabled" boolean,
	"check_model" text,
	"logo" text,
	"sdk_type" text DEFAULT 'openai',
	"description" text,
	"enabled_chat_models" text[],
	"key_vaults" text,
	"config" jsonb,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_providers_id_user_id_pk" PRIMARY KEY("id","user_id")
);
--> statement-breakpoint
ALTER TABLE "ai_models" ADD CONSTRAINT "ai_models_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_providers" ADD CONSTRAINT "ai_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;