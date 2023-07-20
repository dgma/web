import { type ReactNode } from "react";
import cn from "classnames";
import { BaseButton } from "@/components/Buttons";
import { TokenList } from "./TableList";
import { TableCol } from "./TableCol";
import { Statistics } from "./Statistics";

function TableTitle({ children }: { children: ReactNode }) {
  return <p className="text-2xl underline">{children}</p>;
}

type TableProps = {
  className?: string;
};

export default function Table({ className }: TableProps) {
  return (
    <div className={cn(className, "grid grid-cols-2 gap-x-10")}>
      <TableCol>
        <TableTitle>Statistics: </TableTitle>
        <Statistics />
        <div className="flex self-end">
          <BaseButton className="mr-5">Recover</BaseButton>
          <BaseButton>Cancel & Withdraw</BaseButton>
        </div>
      </TableCol>
      <TableCol>
        <TableTitle>Stored Tokens: </TableTitle>
        <TokenList />
        <BaseButton className="self-end">Add new token</BaseButton>
      </TableCol>
    </div>
  );
}
