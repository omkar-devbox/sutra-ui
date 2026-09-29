import React, { useState } from "react";
import {
  FormField,
  FormLayout,
  FormSection,
  FormRow,
  FormItem,
  FormActions,
  JsonFormRenderer,
  JsonFormSchema,
} from "@/shared/ui/formField";
import { Button, Badge } from "@/shared/ui";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Globe,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
} from "lucide-react";

export default function FormFieldDemoPage() {
  const [formData, setFormData] = useState<Record<string, any>>({
    firstName: "Omkar",
    lastName: "Jadhav",
    email: "omkar@prologiccrm.com",
    phone: "+91 9876543210",
    role: "admin",
    experience: "3-5",
    joinDate: new Date().toISOString().split("T")[0],
    salary: 1200000,
    website: "https://prologiccrm.com",
    department: ["engineering", "ai"],
    bio: "Senior Full Stack & AI Solutions Architect with a passion for building enterprise grade design systems.",
    subscribeNewsletter: true,
    termsAccepted: true,
    preferredContact: "email",
    securityLevel: "high",
    gender: "male",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [jsonFormValues, setJsonFormValues] = useState<Record<string, any>>({
    companyName: "Prologic CRM Tech",
    industry: "fintech",
    taxId: "GSTIN-27AABCU9603R1ZM",
    employeeCount: "50-200",
    billingCycle: "annual",
  });

  // Handle standard field changes
  const handleChange = (field: string) => (e: any) => {
    let value = e;
    if (e && typeof e === "object" && "target" in e) {
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleValidate = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email address is required";
    if (!formData.role) errors.role = "Please select a role";
    if (!formData.termsAccepted) errors.termsAccepted = "You must accept terms & conditions";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }, 800);
    }
  };

  // Sample Dynamic JSON Schema
  const dynamicJsonSchema: JsonFormSchema = [
    {
      name: "companyName",
      label: "Company / Organization Name",
      type: "text",
      required: true,
      colSpan: 1,
      placeholder: "e.g. Acme Corp",
    },
    {
      name: "industry",
      label: "Industry Sector",
      type: "select",
      required: true,
      colSpan: 1,
      options: [
        { label: "FinTech & Banking", value: "fintech" },
        { label: "Healthcare & MedTech", value: "healthcare" },
        { label: "Software & SaaS", value: "saas" },
        { label: "Manufacturing & Logistics", value: "manufacturing" },
      ],
    },
    {
      name: "taxId",
      label: "Tax ID / GST Number (Masked PII)",
      type: "text",
      isPII: true,
      colSpan: 1,
      placeholder: "Enter GST/Tax Number",
    },
    {
      name: "employeeCount",
      label: "Total Employees",
      type: "radio",
      colSpan: 1,
      options: [
        { label: "1-10", value: "1-10" },
        { label: "10-50", value: "10-50" },
        { label: "50-200", value: "50-200" },
        { label: "200+", value: "200+" },
      ],
    },
    {
      name: "billingCycle",
      label: "Preferred Billing Frequency",
      type: "select",
      colSpan: "full",
      options: [
        { label: "Monthly Billing (Standard)", value: "monthly" },
        { label: "Annual Billing (20% Discount)", value: "annual" },
        { label: "Custom Enterprise Contract", value: "enterprise" },
      ],
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" className="px-3 py-1 font-semibold">
                <Sparkles className="h-3.5 w-3.5 mr-1 text-blue-500" />
                Sutra UI Forms
              </Badge>
              <Badge variant="outline" className="text-xs">
                Interactive Showcase
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              FormField & Layout Engine
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Exhaustive demonstration of all FormField types, custom inputs, multi-select, date-picker, RBAC controls, responsive multi-column layouts, and JSON Form Schema generation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  role: "",
                  salary: "",
                  website: "",
                  department: [],
                  bio: "",
                  termsAccepted: false,
                  subscribeNewsletter: false,
                  gender: "male",
                });
                setFormErrors({});
              }}
            >
              Reset All
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Submit Form"}
            </Button>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Form Submitted Successfully!</h4>
            <p className="text-xs opacity-90">All input fields validated and state updated.</p>
          </div>
        </div>
      )}

      {/* Main Grid Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Standard Input Primitives */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 md:p-8 shadow-xs">
          <FormSection
            title="1. Core Input Primitives & Affixes"
            description="Text, Email, Password toggle, Number, Telephone, and URL with icons & validation"
            icon={<User className="h-5 w-5" />}
            badge={<Badge variant="secondary">Basic Fields</Badge>}
            divider
          >
            <FormLayout columns={2} gap="lg">
              <FormField
                label="First Name"
                name="firstName"
                placeholder="e.g. Omkar"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                error={formErrors.firstName}
                required
                prefixIcon={<User className="h-4 w-4" />}
                hint="Your legal given name"
              />

              <FormField
                label="Last Name"
                name="lastName"
                placeholder="e.g. Jadhav"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                error={formErrors.lastName}
                required
                hint="Your family/surname"
              />

              <FormField
                type="email"
                label="Email Address"
                name="email"
                placeholder="omkar@example.com"
                value={formData.email}
                onChange={handleChange("email")}
                error={formErrors.email}
                required
                prefixIcon={<Mail className="h-4 w-4" />}
                helperText="We will send your verification link here"
              />

              <FormField
                type="password"
                label="Password (Toggle Eye)"
                name="password"
                placeholder="Enter secret key..."
                showPasswordToggle
                prefixIcon={<Lock className="h-4 w-4" />}
                helperText="Password toggle button is built-in"
              />

              <FormField
                type="tel"
                label="Contact Phone"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange("phone")}
                prefixIcon={<Phone className="h-4 w-4" />}
              />

              <FormField
                type="number"
                label="Annual Salary (INR)"
                name="salary"
                placeholder="1200000"
                value={formData.salary}
                onChange={handleChange("salary")}
                prefixIcon={<DollarSign className="h-4 w-4" />}
              />

              <FormField
                type="url"
                label="Personal Portfolio / Website"
                name="website"
                placeholder="https://prologiccrm.com"
                value={formData.website}
                onChange={handleChange("website")}
                colSpan="full"
                prefixIcon={<Globe className="h-4 w-4" />}
              />
            </FormLayout>
          </FormSection>
        </div>

        {/* Section 2: Advanced Selects & Date Pickers */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 md:p-8 shadow-xs">
          <FormSection
            title="2. Selects, Multi-Select & Date Picker"
            description="Floating dropdown menus, Searchable options, Tag badges, and Date calendar"
            icon={<Sliders className="h-5 w-5" />}
            badge={<Badge variant="primary">Complex Inputs</Badge>}
            divider
          >
            <FormLayout columns={2} gap="lg">
              <FormField
                type="select"
                label="Primary Role"
                name="role"
                value={formData.role}
                onChange={handleChange("role")}
                error={formErrors.role}
                required
                isSearchable
                options={[
                  { label: "Full Stack Engineer", value: "fullstack" },
                  { label: "AI & ML Specialist", value: "ai" },
                  { label: "Product Manager", value: "pm" },
                  { label: "System Administrator", value: "admin" },
                  { label: "UI/UX Designer", value: "designer" },
                ]}
                placeholder="Select a role..."
              />

              <FormField
                type="select"
                label="Departments (Multi-Select Tags)"
                name="department"
                value={formData.department}
                onChange={handleChange("department")}
                isMulti
                isSearchable
                isClearable
                options={[
                  { label: "Engineering", value: "engineering" },
                  { label: "Artificial Intelligence", value: "ai" },
                  { label: "Design System", value: "design" },
                  { label: "Marketing", value: "marketing" },
                  { label: "Customer Success", value: "support" },
                ]}
                placeholder="Select multiple tags..."
              />

              <FormField
                type="date"
                label="Joining Date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange("joinDate")}
                showTodayButton
                dateFormat="dd-mm-yyyy"
                placeholder="Pick joining date"
              />

              <FormField
                type="text"
                label="National ID / PAN Card (Masked PII)"
                name="panCard"
                defaultValue="ABCDE1234F"
                isPII
                helperText="Sensitive PII field with auto-masking"
              />

              <FormField
                type="textarea"
                label="Professional Bio / Notes"
                name="bio"
                value={formData.bio}
                onChange={handleChange("bio")}
                rows={3}
                colSpan="full"
                placeholder="Write a brief intro..."
                helperText="Supports multi-line text input with custom rows count"
              />
            </FormLayout>
          </FormSection>
        </div>

        {/* Section 3: Selection Controls (Radio & Checkbox) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 md:p-8 shadow-xs">
          <FormSection
            title="3. Selection Controls (Radio & Checkboxes)"
            description="Radio groups, switches, single checkboxes with validation state"
            icon={<ShieldCheck className="h-5 w-5" />}
            badge={<Badge variant="outline">Toggles</Badge>}
            divider
          >
            <FormLayout columns={2} gap="lg">
              <div>
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  Gender Specification
                </span>
                <FormField
                  type="radio"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange("gender")}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Non-Binary / Other", value: "other" },
                  ]}
                />
              </div>

              <div>
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  Preferred Contact Medium
                </span>
                <FormField
                  type="radio"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange("preferredContact")}
                  options={[
                    { label: "Email Notifications", value: "email" },
                    { label: "SMS Alerts", value: "sms" },
                    { label: "WhatsApp Updates", value: "whatsapp" },
                  ]}
                />
              </div>

              <div className="col-span-full pt-4 space-y-3 border-t border-slate-200 dark:border-slate-800">
                <FormField
                  type="checkbox"
                  name="subscribeNewsletter"
                  label="Subscribe to weekly product updates and developer newsletter"
                  value={formData.subscribeNewsletter}
                  onChange={handleChange("subscribeNewsletter")}
                />

                <FormField
                  type="checkbox"
                  name="termsAccepted"
                  label="I agree to the Terms of Service, Privacy Policy and Security Guidelines"
                  value={formData.termsAccepted}
                  onChange={handleChange("termsAccepted")}
                  error={formErrors.termsAccepted}
                  required
                />
              </div>
            </FormLayout>

            <FormActions align="between" className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6">
              <span className="text-xs text-slate-500">
                All fields are automatically styled according to theme tokens.
              </span>
              <div className="flex items-center gap-3">
                <Button variant="outline" type="button" onClick={() => setFormData({})}>
                  Clear
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Save Information"}
                </Button>
              </div>
            </FormActions>
          </FormSection>
        </div>

        {/* Section 4: Dynamic JSON Schema Form Renderer */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-50/50 dark:from-indigo-950/20 to-slate-50 dark:to-slate-900/60 p-6 md:p-8 shadow-xs">
          <FormSection
            title="4. Dynamic JSON Schema Form Renderer (<JsonFormRenderer />)"
            description="Zero-boilerplate dynamic form built entirely from a JSON/Config schema"
            icon={<FileText className="h-5 w-5 text-indigo-500" />}
            badge={<Badge variant="primary">Server Driven UI</Badge>}
            divider
          >
            <JsonFormRenderer
              schema={dynamicJsonSchema}
              values={jsonFormValues}
              onChange={(name, val) => {
                setJsonFormValues((prev) => ({ ...prev, [name]: val }));
              }}
              gridCols={2}
              gap="lg"
            />

            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 mb-1">// Real-time JSON Form Output State:</div>
              {JSON.stringify(jsonFormValues, null, 2)}
            </div>
          </FormSection>
        </div>
      </form>
    </div>
  );
}
