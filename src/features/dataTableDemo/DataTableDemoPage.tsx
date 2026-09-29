import { useMemo, useState } from "react";
import {
  DataTable,
  ColumnDef,
  Badge,
  Button,
  DatePicker,
} from "@/shared/ui";
import {
  Table as TableIcon,
  UserCheck,
  Building2,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Download,
  Plus,
  TrendingUp,
  Mail,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  HelpCircle,
  SlidersHorizontal,
} from "lucide-react";

// ==================== Interfaces ====================

export interface EmployeeRecord {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  department: "Engineering" | "Design" | "Product" | "Marketing" | "Operations" | "Finance";
  salary: number;
  status: "Active" | "Pending" | "On Leave" | "Terminated";
  joinDate: string;
  rating: number;
  location: string;
  completionRate: number;
}

// ==================== Mock Data Generator ====================

const INITIAL_DEMO_DATA: EmployeeRecord[] = [
  {
    id: "EMP-1001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    name: "Eleanor Vance",
    email: "eleanor.vance@sutra.ai",
    role: "Staff AI Engineer",
    department: "Engineering",
    salary: 165000,
    status: "Active",
    joinDate: "2022-03-15",
    rating: 4.9,
    location: "San Francisco, USA",
    completionRate: 96,
  },
  {
    id: "EMP-1002",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    name: "Marcus Aurelius Chen",
    email: "marcus.chen@sutra.ai",
    role: "Lead Product Designer",
    department: "Design",
    salary: 142000,
    status: "Active",
    joinDate: "2021-08-01",
    rating: 4.8,
    location: "Seattle, USA",
    completionRate: 92,
  },
  {
    id: "EMP-1003",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    name: "Aria Montgomery",
    email: "aria.mont@sutra.ai",
    role: "VP of Product",
    department: "Product",
    salary: 195000,
    status: "Active",
    joinDate: "2020-01-10",
    rating: 5.0,
    location: "New York, USA",
    completionRate: 99,
  },
  {
    id: "EMP-1004",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    name: "Devon Santiago",
    email: "devon.s@sutra.ai",
    role: "DevOps & Cloud Architect",
    department: "Engineering",
    salary: 158000,
    status: "On Leave",
    joinDate: "2022-11-20",
    rating: 4.6,
    location: "Austin, USA",
    completionRate: 88,
  },
  {
    id: "EMP-1005",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    name: "Sophia Rodriguez",
    email: "sophia.r@sutra.ai",
    role: "Senior Growth Marketing",
    department: "Marketing",
    salary: 118000,
    status: "Active",
    joinDate: "2023-04-12",
    rating: 4.7,
    location: "Chicago, USA",
    completionRate: 91,
  },
  {
    id: "EMP-1006",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    name: "Liam O'Connor",
    email: "liam.oc@sutra.ai",
    role: "Backend Rust Specialist",
    department: "Engineering",
    salary: 150000,
    status: "Pending",
    joinDate: "2024-02-01",
    rating: 4.4,
    location: "Dublin, Ireland",
    completionRate: 78,
  },
  {
    id: "EMP-1007",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    name: "Dr. Hiroshi Tanaka",
    email: "hiroshi.tanaka@sutra.ai",
    role: "Principal Quantitative Researcher",
    department: "Finance",
    salary: 210000,
    status: "Active",
    joinDate: "2019-06-15",
    rating: 5.0,
    location: "Tokyo, Japan",
    completionRate: 98,
  },
  {
    id: "EMP-1008",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    name: "Fatima Al-Mansoor",
    email: "fatima.m@sutra.ai",
    role: "Operations Director",
    department: "Operations",
    salary: 135000,
    status: "Active",
    joinDate: "2021-09-01",
    rating: 4.8,
    location: "Dubai, UAE",
    completionRate: 94,
  },
  {
    id: "EMP-1009",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    name: "Lucas Gabriel",
    email: "lucas.g@sutra.ai",
    role: "UI/UX Interaction Engineer",
    department: "Design",
    salary: 125000,
    status: "Active",
    joinDate: "2023-01-18",
    rating: 4.7,
    location: "Berlin, Germany",
    completionRate: 89,
  },
  {
    id: "EMP-1010",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    name: "Chloe Dupont",
    email: "chloe.d@sutra.ai",
    role: "Frontend React Architect",
    department: "Engineering",
    salary: 154000,
    status: "Active",
    joinDate: "2021-03-30",
    rating: 4.9,
    location: "Paris, France",
    completionRate: 97,
  },
  {
    id: "EMP-1011",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    name: "Jameson Blake",
    email: "jameson.b@sutra.ai",
    role: "Security & Compliance Lead",
    department: "Operations",
    salary: 148000,
    status: "Active",
    joinDate: "2020-11-12",
    rating: 4.8,
    location: "London, UK",
    completionRate: 95,
  },
  {
    id: "EMP-1012",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80",
    name: "Ananya Sharma",
    email: "ananya.s@sutra.ai",
    role: "Fullstack ML Engineer",
    department: "Engineering",
    salary: 160000,
    status: "Active",
    joinDate: "2022-07-04",
    rating: 4.9,
    location: "Bengaluru, India",
    completionRate: 98,
  },
  {
    id: "EMP-1013",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
    name: "Mia Lindqvist",
    email: "mia.l@sutra.ai",
    role: "Brand Design Lead",
    department: "Design",
    salary: 130000,
    status: "On Leave",
    joinDate: "2023-05-19",
    rating: 4.6,
    location: "Stockholm, Sweden",
    completionRate: 85,
  },
  {
    id: "EMP-1014",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    name: "Tariq Hassan",
    email: "tariq.h@sutra.ai",
    role: "Financial Analyst",
    department: "Finance",
    salary: 115000,
    status: "Pending",
    joinDate: "2024-01-15",
    rating: 4.3,
    location: "Toronto, Canada",
    completionRate: 80,
  },
  {
    id: "EMP-1015",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    name: "Viktor Novak",
    email: "viktor.n@sutra.ai",
    role: "Systems Administrator",
    department: "Operations",
    salary: 110000,
    status: "Terminated",
    joinDate: "2019-02-10",
    rating: 3.8,
    location: "Prague, Czechia",
    completionRate: 65,
  },
  {
    id: "EMP-1016",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    name: "Isabella Martinez",
    email: "isabella.m@sutra.ai",
    role: "Product Marketing Manager",
    department: "Marketing",
    salary: 122000,
    status: "Active",
    joinDate: "2022-09-14",
    rating: 4.8,
    location: "Madrid, Spain",
    completionRate: 94,
  },
  {
    id: "EMP-1017",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    name: "Alexander Wright",
    email: "alex.wright@sutra.ai",
    role: "Data Infrastructure Lead",
    department: "Engineering",
    salary: 172000,
    status: "Active",
    joinDate: "2021-04-18",
    rating: 4.9,
    location: "Boston, USA",
    completionRate: 97,
  },
  {
    id: "EMP-1018",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    name: "Camila Fernandez",
    email: "camila.f@sutra.ai",
    role: "UI Motion Designer",
    department: "Design",
    salary: 128000,
    status: "Active",
    joinDate: "2023-08-01",
    rating: 4.7,
    location: "Buenos Aires, Argentina",
    completionRate: 90,
  },
  {
    id: "EMP-1019",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    name: "Gabriel Santos",
    email: "gabriel.s@sutra.ai",
    role: "Risk Management Officer",
    department: "Finance",
    salary: 138000,
    status: "Active",
    joinDate: "2020-05-22",
    rating: 4.6,
    location: "São Paulo, Brazil",
    completionRate: 93,
  },
  {
    id: "EMP-1020",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    name: "Yuki Takahashi",
    email: "yuki.t@sutra.ai",
    role: "Principal Product Strategist",
    department: "Product",
    salary: 185000,
    status: "Active",
    joinDate: "2019-10-11",
    rating: 5.0,
    location: "Kyoto, Japan",
    completionRate: 99,
  },
  {
    id: "EMP-1021",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    name: "Siddharth Verma",
    email: "sid.verma@sutra.ai",
    role: "Fullstack Platform Engineer",
    department: "Engineering",
    salary: 152000,
    status: "Active",
    joinDate: "2022-01-20",
    rating: 4.8,
    location: "Hyderabad, India",
    completionRate: 95,
  },
  {
    id: "EMP-1022",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    name: "Elena Rostova",
    email: "elena.r@sutra.ai",
    role: "HR Operations Lead",
    department: "Operations",
    salary: 116000,
    status: "On Leave",
    joinDate: "2021-12-05",
    rating: 4.5,
    location: "Warsaw, Poland",
    completionRate: 84,
  },
  {
    id: "EMP-1023",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    name: "Nathaniel Drake",
    email: "nathan.d@sutra.ai",
    role: "Content & Brand Strategist",
    department: "Marketing",
    salary: 112000,
    status: "Active",
    joinDate: "2023-06-17",
    rating: 4.6,
    location: "Sydney, Australia",
    completionRate: 88,
  },
  {
    id: "EMP-1024",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    name: "Zara Qureshi",
    email: "zara.q@sutra.ai",
    role: "AI Ethics & Governance Specialist",
    department: "Product",
    salary: 168000,
    status: "Active",
    joinDate: "2022-04-10",
    rating: 4.9,
    location: "London, UK",
    completionRate: 96,
  },
  {
    id: "EMP-1025",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    name: "Mateo Rossi",
    email: "mateo.rossi@sutra.ai",
    role: "Corporate Finance Controller",
    department: "Finance",
    salary: 155000,
    status: "Active",
    joinDate: "2020-08-30",
    rating: 4.7,
    location: "Milan, Italy",
    completionRate: 92,
  },
];

// ==================== Component ====================

export const DataTableDemoPage: React.FC = () => {
  const [data, setData] = useState<EmployeeRecord[]>(INITIAL_DEMO_DATA);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [layoutMode, setLayoutMode] = useState<"table" | "card">("table");

  // Summary KPI Metrics
  const metrics = useMemo(() => {
    const totalEmployees = data.length;
    const activeEmployees = data.filter((d) => d.status === "Active").length;
    const avgSalary = Math.round(
      data.reduce((acc, d) => acc + d.salary, 0) / (totalEmployees || 1)
    );
    const avgRating = (
      data.reduce((acc, d) => acc + d.rating, 0) / (totalEmployees || 1)
    ).toFixed(1);

    return { totalEmployees, activeEmployees, avgSalary, avgRating };
  }, [data]);

  // Filtered dataset for DataTable
  const filteredDataset = useMemo(() => {
    return data.filter((item) => {
      const matchDept =
        departmentFilter === "All" || item.department === departmentFilter;
      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchDept && matchStatus;
    });
  }, [data, departmentFilter, statusFilter]);

  // Quick Action Handlers
  const handleSimulateReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleAddNewRecord = () => {
    const nextNum = data.length + 1001;
    const newRecord: EmployeeRecord = {
      id: `EMP-${nextNum}`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      name: `New Member (${nextNum})`,
      email: `member${nextNum}@sutra.ai`,
      role: "AI Workflow Specialist",
      department: "Engineering",
      salary: 145000,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      rating: 5.0,
      location: "San Francisco, USA",
      completionRate: 100,
    };
    setData([newRecord, ...data]);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  // Status Badge Helper
  const getStatusBadge = (status: EmployeeRecord["status"]) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="success" dot pulse size="sm">
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="warning" dot size="sm">
            Pending
          </Badge>
        );
      case "On Leave":
        return (
          <Badge variant="info" dot size="sm">
            On Leave
          </Badge>
        );
      case "Terminated":
        return (
          <Badge variant="danger" dot size="sm">
            Terminated
          </Badge>
        );
      default:
        return <Badge size="sm">{status}</Badge>;
    }
  };

  // ==================== Column Definitions ====================
  const columns: ColumnDef<EmployeeRecord>[] = useMemo(
    () => [
      {
        id: "id",
        key: "id",
        label: "Employee ID",
        width: 140,
        sortable: true,
        pinned: "left",
        render: (row) => (
          <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-md">
            {row.id}
          </span>
        ),
        footerRender: (items) => (
          <span className="text-xs font-bold text-slate-500">
            Total: {items.length}
          </span>
        ),
      },
      {
        id: "name",
        key: "name",
        label: "Employee Profile",
        width: 250,
        sortable: true,
        render: (row) => (
          <div className="flex items-center gap-3">
            <img
              src={row.avatar}
              alt={row.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-2xs"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs truncate">
                {row.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {row.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "department",
        key: "department",
        label: "Department",
        width: 150,
        sortable: true,
        isFilter: true,
        filterSectionRender: () => (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Filter by Department
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full text-xs p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        ),
        render: (row) => (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {row.department}
          </span>
        ),
      },
      {
        id: "role",
        key: "role",
        label: "Designation",
        width: 190,
        sortable: true,
        render: (row) => (
          <span className="text-xs text-slate-800 dark:text-slate-200 font-medium truncate">
            {row.role}
          </span>
        ),
      },
      {
        id: "status",
        key: "status",
        label: "Status",
        width: 130,
        align: "center",
        headerAlign: "center",
        sortable: true,
        isFilter: true,
        filterSectionRender: () => (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Filter Status
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="On Leave">On Leave</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
        ),
        render: (row) => getStatusBadge(row.status),
      },
      {
        id: "salary",
        key: "salary",
        label: "Annual Compensation",
        width: 180,
        align: "right",
        headerAlign: "right",
        sortable: true,
        render: (row) => (
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
            ${row.salary.toLocaleString()}
          </span>
        ),
        footerRender: (items) => {
          const total = items.reduce((acc, curr) => acc + curr.salary, 0);
          return (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Avg: ${(Math.round(total / (items.length || 1))).toLocaleString()}
            </span>
          );
        },
      },
      {
        id: "completionRate",
        key: "completionRate",
        label: "Performance Progress",
        width: 180,
        sortable: true,
        render: (row) => (
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${row.completionRate >= 90
                    ? "bg-emerald-500"
                    : row.completionRate >= 80
                      ? "bg-blue-500"
                      : "bg-amber-500"
                  }`}
                style={{ width: `${row.completionRate}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 w-8 text-right">
              {row.completionRate}%
            </span>
          </div>
        ),
      },
      {
        id: "location",
        key: "location",
        label: "Workplace",
        width: 160,
        sortable: true,
        render: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400">
            {row.location}
          </span>
        ),
      },
      {
        id: "joinDate",
        key: "joinDate",
        label: "Joined Date",
        width: 140,
        sortable: true,
        render: (row) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            {row.joinDate}
          </span>
        ),
      },
      {
        id: "actions",
        label: "Actions",
        width: 110,
        pinned: "right",
        align: "center",
        headerAlign: "center",
        render: (row) => (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => alert(`View details for: ${row.name} (${row.id})`)}
              title="View Profile"
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => alert(`Edit record: ${row.name}`)}
              title="Edit Profile"
              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
            >
              <Edit size={15} />
            </button>
            <button
              onClick={() =>
                setData((prev) => prev.filter((item) => item.id !== row.id))
              }
              title="Delete Record"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ),
      },
    ],
    [departmentFilter, statusFilter]
  );

  // Custom Card View Renderer for Card Layout switch
  const renderCustomCard = (item: EmployeeRecord) => {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                {item.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.role}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                <Building2 size={12} />
                <span>{item.department}</span>
              </div>
            </div>
          </div>
          {getStatusBadge(item.status)}
        </div>

        <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Location:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {item.location}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Compensation:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              ${item.salary.toLocaleString()}/yr
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Progress:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {item.completionRate}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="font-mono text-[11px] text-slate-400">
            {item.id}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert(`View ${item.name}`)}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() =>
                setData((prev) => prev.filter((i) => i.id !== item.id))
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* ── Page Hero Header ────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur mb-3">
              <Sparkles size={14} className="text-indigo-400" />
              Sutra-UI Advanced Data Engine
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Interactive DataTable Showcase
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              Explore all enterprise features of the DataTable component: Sticky Column Pinning (Left & Right), Multi-Column Sorting, Interactive Column Resizing, Global Search, Row Selection, Card View Switcher, Virtualization & Summary Footers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Button
              variant="secondary"
              leftIcon={<Plus size={16} />}
              onClick={handleAddNewRecord}
            >
              Add Employee
            </Button>
            <Button
              variant="primary"
              leftIcon={<Download size={16} />}
              onClick={() => alert("Exporting DataTable to CSV / Excel...")}
            >
              Export Records
            </Button>
          </div>
        </div>
      </div>

      {/* ── Feature Badges / Highlights ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <UserCheck size={20} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">
              Total Personnel
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {metrics.totalEmployees}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">
              Active Status
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {metrics.activeEmployees}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <DollarSign size={20} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">
              Average Salary
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ${metrics.avgSalary.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">
              Avg Rating
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {metrics.avgRating} / 5.0
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Features Pill Bar ───────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <SlidersHorizontal size={14} className="text-indigo-500" />
            Enabled Capabilities:
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            📌 Left & Right Sticky Pinning
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            ↔️ Drag Resizing & Autosize
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            🔃 Multi-Column Sorting
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            ☑️ Checkbox Selection ({selectedIds.length} Selected)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
            📇 Table / Card Layout Switcher
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              leftIcon={<Trash2 size={14} />}
              onClick={handleDeleteSelected}
            >
              Delete ({selectedIds.length})
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateReload}
            isLoading={isLoading}
          >
            Simulate Loading
          </Button>
        </div>
      </div>

      {/* ── Main DataTable Card ────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-2 shadow-sm">
        {(departmentFilter !== "All" || statusFilter !== "All") && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/50 dark:bg-blue-950/20 border-b border-slate-100 dark:border-slate-800 rounded-t-2xl flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Active Filters:</span>
              {departmentFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                  Dept: {departmentFilter}
                  <button
                    onClick={() => setDepartmentFilter("All")}
                    className="hover:text-rose-500 border-none bg-transparent cursor-pointer ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
              {statusFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                  Status: {statusFilter}
                  <button
                    onClick={() => setStatusFilter("All")}
                    className="hover:text-rose-500 border-none bg-transparent cursor-pointer ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setDepartmentFilter("All");
                setStatusFilter("All");
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-transparent border-none cursor-pointer underline"
            >
              Clear All Filters
            </button>
          </div>
        )}

        <DataTable<EmployeeRecord>
          data={filteredDataset}
          columns={columns}
          getRowId={(row) => row.id}
          selectable={true}
          selection={selectedIds}
          onSelectionChange={(newSelection) => setSelectedIds(newSelection)}
          enableSearch={true}
          isLoading={isLoading}
          renderCard={renderCustomCard}
          height="620px"
          pageSize={10}
        />
      </div>

      {/* ── Feature Documentation Accordion / Cheatsheet ──────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Sticky Column Pinning
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Click the column filter icon to pin any column to the <strong>Left</strong> or <strong>Right</strong>. Try scrolling horizontally to see frozen headers & rows in action.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Interactive Column Resizing
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Hover over any column border handle and drag to resize dynamically. <strong>Double-click</strong> the border resizer to auto-fit optimal content width.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Grid / Card Mode Switch
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Use the top right toolbar icons to toggle between structured <strong>Tabular View</strong> and high-density responsive <strong>Card Grid View</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataTableDemoPage;
