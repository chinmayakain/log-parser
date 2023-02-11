import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Props {
    error: string;
    handleError: Function;
}

export default function Modal(props: Props) {
    const { error, handleError } = props;
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto ">
                    {/*content*/}
                    <div className="border-0 h-fit rounded-lg shadow-lg relative flex flex-col w-96 bg-slate-50 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <ExclamationTriangleIcon className="h-12 w-12 fill-red-600 " />
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                {error}
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handleError("")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
