// OutputDetailsProps.tsx

// Define the output details interface
export interface OutputDetailsProps {
  status: {
    description: string;
    id: number;
  };
  memory: string;
  time: string;
  compile_output: string;
  stdout: string;
  stderr: string;
}
