import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BaseButton } from "@/components/Buttons";

import {
  SelectTokenControl,
  AmountInputControl,
} from "@/components/TokenInputControls";

interface IDepositTokenModalProps {
  isOpen: boolean;
  closeModal: () => void;
  type: "deposit" | "withdraw";
}

export default function ChangeTokenModal({
  isOpen,
  closeModal,
  type,
}: IDepositTokenModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {`Select ERC20 token to ${type}`}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Currently web app supports only 5 the most popular tokens
                  </p>
                </div>

                <div className="mt-2 relative min-h-min">
                  <SelectTokenControl />
                </div>

                <div className="mt-2 relative min-h-min">
                  <AmountInputControl />
                </div>

                <div className="mt-2 flex self-end">
                  <BaseButton onClick={closeModal} className="mr-3">
                    {`${type[0].toUpperCase()}${type.substring(1)}`}
                  </BaseButton>
                  <BaseButton
                    onClick={closeModal}
                    className="bg-transparent hover:bg-transparent text-indigo-400 hover:text-indigo-500 ring-1 ring-inset ring-indigo-400 hover:ring-indigo-500"
                  >
                    Cancel
                  </BaseButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
