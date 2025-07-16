import React from "react";
import { Link } from "react-router-dom";

export type AuthFormField = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export type AuthFormProps = {
  fields: AuthFormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
  footer?: React.ReactNode;
  requireTerms?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
  footer,
  requireTerms,
}) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const field of fields) {
      if (!values[field.name]) {
        setError("Please fill in all fields.");
        return;
      }
    }
    if (requireTerms && !termsAccepted) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} style={{ fontWeight: 600 }}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            value={values[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            style={{
              padding: "0.7em 1em",
              borderRadius: 10,
              border: "1px solid #EEE",
              width: "100%",
            }}
          />
        </div>
      ))}
      {requireTerms && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <label htmlFor="terms" style={{ fontSize: 15 }}>
            I agree to the{" "}
            <Link to="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </Link>
          </label>
        </div>
      )}
      {error && <div style={{ color: "#d32f2f", fontSize: 15 }}>{error}</div>}
      <button type="submit" style={{ marginTop: 8 }}>
        {submitLabel}
      </button>
      {success && (
        <div style={{ color: "#388e3c", marginTop: 8 }}>Submitted!</div>
      )}
      {footer}
    </form>
  );
};

export default AuthForm;
