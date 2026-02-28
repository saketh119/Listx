import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function UploadCSV() {
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'validating' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            startUpload(file.name);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-brand-lake', 'bg-brand-lake/5');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-brand-lake', 'bg-brand-lake/5');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-brand-lake', 'bg-brand-lake/5');
        const file = e.dataTransfer.files?.[0];
        if (file) {
            // Check if it's a CSV/Excel
            if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
                startUpload(file.name);
            } else {
                setUploadState('error');
                setFileName(file.name);
            }
        }
    };

    const startUpload = (name: string) => {
        setFileName(name);
        setUploadState('uploading');
        setProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setUploadState('validating');
                    // Simulate validation
                    setTimeout(() => {
                        setUploadState('success');
                    }, 1500);
                    return 100;
                }
                return p + (Math.random() * 15);
            });
        }, 300);
    };

    const resetUpload = () => {
        setUploadState('idle');
        setProgress(0);
        setFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products/upload">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Methods
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-jade/10 flex items-center justify-center text-brand-jade">
                        <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Bulk Upload Products</h1>
                </div>
                <p className="text-body-sm text-text-muted mt-2">
                    Upload a CSV or Excel file to add or update multiple products at once. <a href="#" className="text-brand-lake hover:underline">Download our template</a> to ensure required fields are met.
                </p>
            </div>

            <div className="bg-white rounded-[2rem] border border-border/60 shadow-sm p-8 sm:p-12 mb-6">

                {uploadState === 'idle' && (
                    <div
                        className="border-2 border-dashed border-border/60 rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors hover:border-brand-lake/50 hover:bg-brand-lake/5 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            className="hidden"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center text-text-muted mb-6">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-body-lg font-bold text-brand-dark mb-2">Click or drag file to this area to upload</h3>
                        <p className="text-body-sm text-text-muted max-w-sm">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.
                        </p>

                        <div className="flex items-center gap-4 mt-8 text-xs font-semibold text-text-muted/60 uppercase tracking-wider">
                            <span>CSV</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>XLSX</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>Max 50MB</span>
                        </div>
                    </div>
                )}

                {(uploadState === 'uploading' || uploadState === 'validating') && (
                    <div className="py-8 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 relative mb-6">
                            <svg className="w-full h-full text-brand-jade/20" viewBox="0 0 100 100">
                                <circle className="stroke-current stroke-[8px] fill-transparent" cx="50" cy="50" r="40" />
                            </svg>
                            <svg className="w-full h-full absolute inset-0 text-brand-jade -rotate-90 origin-center" viewBox="0 0 100 100">
                                <circle
                                    className="stroke-current stroke-[8px] fill-transparent transition-all duration-300 ease-out"
                                    cx="50" cy="50" r="40"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-brand-dark">
                                {Math.round(progress)}%
                            </div>
                        </div>

                        <h3 className="text-body-lg font-bold text-brand-dark mb-2 flex items-center gap-2">
                            {uploadState === 'uploading' ? 'Uploading file...' : (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-brand-lake" />
                                    Validating data structure...
                                </>
                            )}
                        </h3>
                        <p className="text-body-sm text-text-muted font-mono">{fileName}</p>

                        {uploadState === 'uploading' && (
                            <Button variant="ghost" onClick={resetUpload} className="mt-8 text-semantic-error hover:text-semantic-error hover:bg-semantic-error/10">
                                Cancel Upload
                            </Button>
                        )}
                    </div>
                )}

                {uploadState === 'success' && (
                    <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center text-brand-jade mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-body-lg font-bold text-brand-dark mb-2">Upload Successful!</h3>
                        <p className="text-body-sm text-text-muted mb-6">
                            Successfully imported <strong>42 products</strong> from <span className="font-mono bg-bg-subtle px-1 rounded">{fileName}</span>.
                        </p>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={resetUpload} className="rounded-xl h-11 border-border/60">
                                Upload Another File
                            </Button>
                            <Button onClick={() => navigate('/dashboard/products')} className="rounded-xl h-11 bg-brand-jade hover:bg-brand-jade/90 px-8 shadow-sm">
                                View Products
                            </Button>
                        </div>
                    </div>
                )}

                {uploadState === 'error' && (
                    <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
                        <div className="w-20 h-20 rounded-full bg-semantic-error/10 flex items-center justify-center text-semantic-error mb-6">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-body-lg font-bold text-brand-dark mb-2">Upload Failed</h3>
                        <p className="text-body-sm text-text-muted max-w-sm mb-6">
                            The file <span className="font-mono bg-bg-subtle px-1 rounded">{fileName}</span> is either unsupported or contains invalid headers. Please download the template and try again.
                        </p>

                        <div className="flex gap-4">
                            <Button variant="outline" className="rounded-xl h-11 border-border/60">
                                Download Logs
                            </Button>
                            <Button onClick={resetUpload} className="rounded-xl h-11 bg-brand-dark text-brand-tea hover:bg-brand-dark/90 hover:text-white px-8 shadow-sm">
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-brand-lake/5 rounded-2xl p-6 border border-brand-lake/20 flex gap-4">
                <AlertCircle className="w-6 h-6 shrink-0 text-brand-lake mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-brand-dark mb-1">Upload Guidelines</h4>
                    <ul className="text-sm text-text-muted space-y-2 list-disc pl-4 marker:text-brand-lake">
                        <li>Maximum file size is 50MB.</li>
                        <li>Supported formats: .csv, .xlsx.</li>
                        <li>Ensure SKUs are unique across all rows to avoid overriding existing products unintentionally.</li>
                        <li>For images, provide publicly accessible URLs separated by commas.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
