import { useState } from "react";
import {
  Mail,
  MapPin,
  Briefcase,
  Warehouse,
  Pencil,
  Key,
  Shield,
  CheckCircle2,
  PackagePlus,
  ArrowLeftRight,
  Clock,
  Bell,
  Lock,
} from "lucide-react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

const USER = {
  name: "Ankit Kumar",
  email: "ankit.kumar@stocksense.io",
  role: "Inventory Manager",
  warehouse: "Main Warehouse",
  joined: "March 2024",
  initials: "AK",
  phone: "+91 98765 43210",
  lastPasswordChange: "Aug 12, 2026",
};

const ACTIVITY = [
  {
    action: 'Added product "Steel Rods"',
    time: "2 hours ago",
    type: "product",
  },
  { action: "Created receipt REC-00124", time: "Yesterday", type: "receipt" },
  {
    action: "Approved transfer TRF-00031",
    time: "2 days ago",
    type: "transfer",
  },
  {
    action: "Updated reorder level for Bearings",
    time: "3 days ago",
    type: "adjustment",
  },
];

const MONTH_STATS = [
  {
    icon: CheckCircle2,
    label: "Orders Processed",
    value: "142",
    trend: "+12% this month",
    accentBg: "var(--color-success-bg)",
    accentColor: "var(--color-success)",
  },
  {
    icon: PackagePlus,
    label: "Products Added",
    value: "18",
    trend: "3 this week",
    accentBg: "var(--color-primary-bg)",
    accentColor: "var(--color-primary)",
  },
  {
    icon: ArrowLeftRight,
    label: "Transfers Approved",
    value: "34",
    trend: "100% on-time",
    accentBg: "var(--color-secondary-bg)",
    accentColor: "var(--color-secondary)",
  },
  {
    icon: Clock,
    label: "Avg Response Time",
    value: "24 min",
    trend: "8m faster vs avg",
    accentBg: "var(--color-warning-bg)",
    accentColor: "var(--color-warning)",
  },
];

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopPush, setDesktopPush] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSaveNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      {/* Page Header */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2 className="page-title">My Profile</h2>
          <p className="page-subtitle">
            Manage your personal credentials, operational footprint, and
            security settings
          </p>
        </div>
        {toastMessage && (
          <div
            style={{
              background: "var(--color-success-bg)",
              color: "var(--color-success)",
              padding: "6px 14px",
              borderRadius: 4,
              fontWeight: 500,
              fontSize: 12.5,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={14} /> {toastMessage}
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 340px) 1fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* Left Column: Profile Card + Preferences/Security Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            height: "100%",
          }}
        >
          {/* Main Profile Identity Card */}
          <div className="card">
            <div
              className="card-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                paddingTop: 24,
                paddingBottom: 20,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(113, 75, 103, 0.25)",
                  flexShrink: 0,
                }}
                aria-label="User avatar"
              >
                {USER.initials}
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {USER.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    marginTop: 4,
                  }}
                >
                  <span className="badge badge-primary">{USER.role}</span>
                </div>
              </div>

              <div
                className="divider"
                style={{ width: "100%", margin: "4px 0" }}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {[
                  { icon: Mail, label: USER.email },
                  { icon: Warehouse, label: USER.warehouse },
                  { icon: Briefcase, label: `Member since ${USER.joined}` },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        background: "var(--color-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        size={13}
                        color="var(--color-text-secondary)"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      style={{
                        color: "var(--color-text-primary)",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="secondary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 6,
                }}
                id="edit-profile-btn"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Pencil size={13} aria-hidden="true" /> Edit Profile
              </Button>
            </div>
          </div>

          {/* B) Security & Preferences Card — flex-grows to fill remaining column height */}
          <div
            className="card"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <div className="card-header" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Shield
                  size={15}
                  color="var(--color-primary)"
                  aria-hidden="true"
                />
                <span className="card-title" style={{ fontSize: 13 }}>
                  Security & Preferences
                </span>
              </div>
            </div>
            <div
              className="card-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "14px 16px",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {/* Change Password Trigger */}
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    Account Authentication
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 12,
                    }}
                  >
                    <Key size={13} aria-hidden="true" /> Change Password
                  </button>
                </div>

                <div className="divider" style={{ margin: "2px 0" }} />

                {/* Notification Toggles */}
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Bell
                      size={12}
                      color="var(--color-text-secondary)"
                      aria-hidden="true"
                    />
                    Notifications
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        Email alerts for receipts
                      </span>
                      <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={(e) => {
                          setEmailAlerts(e.target.checked);
                          handleSaveNotification("Email preferences updated");
                        }}
                        style={{
                          accentColor: "var(--color-primary)",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        Desktop push notifications
                      </span>
                      <input
                        type="checkbox"
                        checked={desktopPush}
                        onChange={(e) => {
                          setDesktopPush(e.target.checked);
                          handleSaveNotification("Push preferences updated");
                        }}
                        style={{
                          accentColor: "var(--color-primary)",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer note — fills remaining vertical space meaningfully instead of leaving blank gap */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "var(--color-text-secondary)",
                  paddingTop: 10,
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <Lock size={11} aria-hidden="true" />
                <span>Password last changed {USER.lastPasswordChange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Details, Recent Activity, and "This Month" Stats Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            height: "100%",
          }}
        >
          {/* Account Details Card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Account Details</span>
              <span className="badge badge-success">Verified Active</span>
            </div>
            <div className="card-body">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  { label: "Full Name", value: USER.name, id: "pf-name" },
                  { label: "Email Address", value: USER.email, id: "pf-email" },
                  {
                    label: "Role / Designation",
                    value: USER.role,
                    id: "pf-role",
                  },
                  {
                    label: "Assigned Warehouse",
                    value: USER.warehouse,
                    id: "pf-wh",
                  },
                ].map((f) => (
                  <div
                    key={f.id}
                    className="form-group"
                    style={{ marginBottom: 0 }}
                  >
                    <label htmlFor={f.id} className="form-label">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type="text"
                      className="form-control"
                      defaultValue={f.value}
                      readOnly
                      style={{
                        background: "var(--color-bg)",
                        cursor: "default",
                        fontWeight: 500,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Recent Activity</span>
              <span
                style={{ fontSize: 12, color: "var(--color-text-secondary)" }}
              >
                Last 7 days
              </span>
            </div>
            <div className="card-body" style={{ padding: "8px 16px" }}>
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom:
                      i < ACTIVITY.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--color-primary)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "var(--color-text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {a.action}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                      marginLeft: 12,
                    }}
                  >
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* A) "This Month" Stats Row — 4 small stat blocks in horizontal grid, flex-grows to fill remaining height */}
          <div
            className="card"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <div className="card-header" style={{ paddingBottom: 10 }}>
              <div>
                <span className="card-title">
                  This Month's Operational Metrics
                </span>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    marginTop: 2,
                  }}
                >
                  Personal activity and turnaround volume for September 2026
                </div>
              </div>
            </div>
            <div
              className="card-body"
              style={{ flex: 1, display: "flex", alignItems: "stretch" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: 12,
                  width: "100%",
                }}
              >
                {MONTH_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 6,
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 8,
                      minHeight: 96,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.3,
                        }}
                      >
                        {stat.label}
                      </span>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 4,
                          background: stat.accentBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <stat.icon
                          size={15}
                          color={stat.accentColor}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                          lineHeight: 1.1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--color-text-secondary)",
                          marginTop: 4,
                          fontWeight: 500,
                        }}
                      >
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsEditModalOpen(false);
                handleSaveNotification("Profile updated successfully!");
              }}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="form-group">
            <label className="form-label required">Full Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={USER.name}
            />
          </div>
          <div className="form-group">
            <label className="form-label required">Email Address</label>
            <input
              type="email"
              className="form-control"
              defaultValue={USER.email}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Assigned Warehouse</label>
            <select className="form-control" defaultValue={USER.warehouse}>
              <option value="Main Warehouse">Main Warehouse</option>
              <option value="Warehouse 2">Warehouse 2</option>
              <option value="Production Floor">Production Floor</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Account Password"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsPasswordModalOpen(false);
                handleSaveNotification("Password updated successfully!");
              }}
            >
              Update Password
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="form-group">
            <label className="form-label required">Current Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <label className="form-label required">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Minimum 8 characters"
            />
          </div>
          <div className="form-group">
            <label className="form-label required">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter new password"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
