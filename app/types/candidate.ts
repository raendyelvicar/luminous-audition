import { Candidate } from '@prisma/client';

export type CandidateWithUrl = Candidate & { screenUrl: string };
