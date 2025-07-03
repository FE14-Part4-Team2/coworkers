import { ReactNode } from "react";

interface IfElseProps {
  condition: boolean | (() => boolean);
  then: ReactNode;
  else?: ReactNode;
}

export default function IfElse({
  condition,
  then,
  else: elseContent,
}: IfElseProps) {
  const evaluatedCondition =
    typeof condition === "function" ? condition() : condition;
  return evaluatedCondition ? <> {then} </> : <> {elseContent}</>;
}
