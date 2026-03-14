import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

export interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "document";
  uploadedBy: string;
  uploadedAt: string;
  url: string;
  category: "proof-of-service" | "photo" | "other";
}

interface InformationTabProps {
  files: UploadedFile[];
  onFileUpload: (file: UploadedFile) => void;
  onFileDelete: (fileId: string) => void;
}

export function InformationTab({ files, onFileUpload, onFileDelete }: InformationTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<"proof-of-service" | "photo" | "other">("photo");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate file upload
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "document",
      uploadedBy: "Current User",
      uploadedAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      url: URL.createObjectURL(file),
      category: selectedCategory,
    };

    onFileUpload(newFile);
    toast.success("File uploaded successfully", {
      description: `${file.name} has been added to the ticket`,
    });

    // Reset input
    e.target.value = "";
  };

  const proofOfServiceFiles = files.filter((f) => f.category === "proof-of-service");
  const photoFiles = files.filter((f) => f.category === "photo");
  const otherFiles = files.filter((f) => f.category === "other");

  const FileCard = ({ file }: { file: UploadedFile }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex-shrink-0">
        {file.type === "image" ? (
          <ImageIcon className="size-8 text-blue-600" />
        ) : (
          <FileText className="size-8 text-green-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate">{file.name}</div>
        <div className="text-xs text-muted-foreground">
          {file.uploadedBy} • {file.uploadedAt}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFileDelete(file.id)}
        className="flex-shrink-0"
      >
        <X className="size-4" />
      </Button>
    </div>
  );

  return (
    <Card className="p-6">
      <h3 className="mb-4">Information & Documents</h3>

      {/* Upload Section */}
      <div className="space-y-4 mb-6 pb-6 border-b">
        <div className="space-y-2">
          <Label htmlFor="category">Document Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proof-of-service">Proof of Service</SelectItem>
              <SelectItem value="photo">Site Photo</SelectItem>
              <SelectItem value="other">Other Document</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload File</Label>
          <div className="flex gap-2">
            <Input
              id="file-upload"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="flex-1"
            />
            <Button variant="outline">
              <Upload className="size-4 mr-2" />
              Upload
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: Images (JPG, PNG), PDF, Word documents
          </p>
        </div>
      </div>

      {/* Proof of Service Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-green-600" />
          <h4 className="text-sm">Proof of Service</h4>
          <span className="text-xs text-muted-foreground">({proofOfServiceFiles.length})</span>
        </div>
        {proofOfServiceFiles.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4 bg-slate-50 rounded-lg">
            No proof of service documents uploaded yet
          </div>
        ) : (
          <div className="space-y-2">
            {proofOfServiceFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>

      {/* Photos Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-5 text-blue-600" />
          <h4 className="text-sm">Site Photos</h4>
          <span className="text-xs text-muted-foreground">({photoFiles.length})</span>
        </div>
        {photoFiles.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4 bg-slate-50 rounded-lg">
            No photos uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {photoFiles.map((file) => (
              <div key={file.id} className="relative">
                {file.type === "image" ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg border border-slate-200"
                  />
                ) : (
                  <div className="w-full h-32 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                    <FileText className="size-12 text-slate-400" />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 size-6 p-0"
                  onClick={() => onFileDelete(file.id)}
                >
                  <X className="size-3" />
                </Button>
                <div className="mt-1 text-xs truncate">{file.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Documents Section */}
      {otherFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-slate-600" />
            <h4 className="text-sm">Other Documents</h4>
            <span className="text-xs text-muted-foreground">({otherFiles.length})</span>
          </div>
          <div className="space-y-2">
            {otherFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}