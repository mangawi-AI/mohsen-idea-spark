CREATE TABLE public.usage_counters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scope TEXT NOT NULL,
  bucket_key TEXT NOT NULL,
  day DATE NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Riyadh')::date,
  count INTEGER NOT NULL DEFAULT 0,
  last_request_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT usage_counters_scope_check CHECK (scope IN ('global', 'visitor')),
  CONSTRAINT usage_counters_unique UNIQUE (scope, bucket_key, day)
);

GRANT ALL ON public.usage_counters TO service_role;

ALTER TABLE public.usage_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No client access to usage counters"
ON public.usage_counters
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);