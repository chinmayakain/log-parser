import { ChangeEvent, MouseEvent, useEffect, useState, FC } from "react";
import { FolderIcon } from "@heroicons/react/24/solid";

import Modal from "./components/Modal";

interface Props {}

const App: FC = (props: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [jsonData, setJsonData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (jsonData) {
            setLoading(true);
            handleDownload();
            setLoading(false);
        }
    }, [jsonData]);

    const handleDownload = (): void => {
        const json = JSON.stringify(jsonData);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName.split(".")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
        setFile(event.target.files ? event.target.files[0] : null);
        setFileName(event.target.files ? event.target.files[0].name : "");
    }

    const handleFileUpload = async (e: MouseEvent<HTMLButtonElement>) => {
        let modifiedFileName = fileName.split(".")[0];

        if (!file || !fileName) {
            setError("Please select a file to upload!");
            throw new Error("Please Select A File To Upload!");
        }

        const formData = new FormData();
        formData.append("fileName", modifiedFileName);
        formData.append(modifiedFileName, file);
        setLoading(true);
        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/logs/logParser/${modifiedFileName}`,
                {
                    method: "POST",
                    headers: {},
                    body: formData,
                }
            );
            const response = await res.json();
            setLoading(false);
            setJsonData(response);
        } catch (err) {
            setLoading(false);
            setError(
                "Sorry could not parse the data, Please try after sometime!"
            );
        }
    };

    function handleError(valueFromChild: string) {
        setError(valueFromChild);
    }

    return (
        <div className="min-h-screen h-fit w-full bg-slate-100 flex items-center justify-center">
            {error && <Modal error={error} handleError={handleError} />}
            <>
                {/* Upload file container */}
                <div className="bg-white h-fit w-[40%] rounded-xl space-y-3 p-7 flex flex-col justify-center items-center">
                    {/* Heading */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <h2 className="font-medium text-3xl">
                            Upload your file
                        </h2>
                        <p className="font-normal text-sm text-gray-400">
                            file should be of the format .txt
                        </p>
                    </div>

                    {/* Upload Container */}
                    <div className="flex items-center justify-center p-8 space-y-4 flex-col border-2 border-dashed border-spacing-1 border-slate-300 rounded-xl bg-blue-50 h-fit w-[90%]">
                        <FolderIcon className="fill-blue-500 h-14 w-14" />
                        <p className="font-normal text-sm text-gray-400">
                            Upload your files here.
                        </p>
                        <form>
                            <label className="block m-1">
                                <span className="sr-only">Choose File</span>
                                <input
                                    name="test"
                                    type="file"
                                    onChange={handleFileSelect}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </label>
                        </form>
                        <button
                            className="flex items-center justify-around rounded-2xl text-lg font-medium bg-blue-300 p-2 h-fit w-36 shadow-lg shadow-slate-200 active:shadow-xl active:scale-105 transition border-gray-500"
                            onClick={handleFileUpload}
                        >
                            {loading && (
                                <div
                                    className="spinner-border animate-spin inline-block border-blue-600 w-8 h-8 border-4 rounded-full"
                                    role="status"
                                >
                                    <span className="visually-hidden"></span>
                                </div>
                            )}
                            Upload
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};

export default App;
