import { z } from "zod";

import { competicaoSchema } from "@/features/competicao/schemas/competicao.schema";

export type CompeticaoFormValues = z.infer<typeof competicaoSchema>;
