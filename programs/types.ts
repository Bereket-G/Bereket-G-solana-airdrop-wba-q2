export interface WbaPrereq {
  address:      string;
  metadata:     Metadata;
  instructions: Instruction[];
  accounts:     WbaPrereqAccount[];
  errors:       Error[];
  types:        TypeElement[];
}

export interface WbaPrereqAccount {
  name:          string;
  discriminator: number[];
}

export interface Error {
  code: number;
  name: string;
  msg:  string;
}

export interface Instruction {
  name:          string;
  discriminator: number[];
  accounts:      InstructionAccount[];
  args:          Arg[];
}

export interface InstructionAccount {
  name:      string;
  writable?: boolean;
  signer?:   boolean;
  pda?:      PDA;
  address?:  string;
}

export interface PDA {
  seeds: Seed[];
}

export interface Seed {
  kind:   string;
  value?: number[];
  path?:  string;
}

export interface Arg {
  name: string;
  type: string;
}

export interface Metadata {
  name:        string;
  version:     string;
  spec:        string;
  description: string;
}

export interface TypeElement {
  name: string;
  type: TypeType;
}

export interface TypeType {
  kind:   string;
  fields: Arg[];
}
