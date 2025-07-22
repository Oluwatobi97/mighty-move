import React, { forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export type ServiceFormField = {
  name: string;
  label: string;
  type?: string;
  options?: string[];
  placeholder?: string;
};

export type ServiceFormProps = {
  fields: ServiceFormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
};

const paymentOptions = ["Bank Transfer", "Apple Pay", "PayPal"];

const paymentIcons: Record<string, string> = {
  "Bank Transfer": "🏦",
  "Apple Pay": "",
  PayPal: "🅿️",
};

const paymentInstructions: Record<string, React.ReactNode> = {
  "Bank Transfer": (
    <div>
      <strong>Bank Transfer Details:</strong>
      <ul style={{ margin: "0.5em 0 0 1em" }}>
        <li>Bank: Example Bank</li>
        <li>Account Name: Mighty Moves Ltd</li>
        <li>Account Number: 1234567890</li>
        <li>Sort Code: 00-00-00</li>
      </ul>
      <div style={{ marginTop: 8 }}>
        Please use your booking reference as the payment reference.
      </div>
    </div>
  ),
  "Apple Pay": (
    <div>
      <strong>Apple Pay Instructions:</strong>
      <div style={{ margin: "0.5em 0 0 1em" }}>
        Send payment to: <b>applepay@mighty-moves.com</b>
        <br />
        Or scan the QR code in your Apple Pay app.
      </div>
    </div>
  ),
  PayPal: (
    <div>
      <strong>PayPal Instructions:</strong>
      <div style={{ margin: "0.5em 0 0 1em" }}>
        Pay to: <b>paypal.me/mightymoves</b>
        <br />
        Or send to: <b>paypal@mighty-moves.com</b>
      </div>
    </div>
  ),
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalCard = styled.div`
  background: #fff9c4;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
  padding: 2rem 1.5rem;
  max-width: 350px;
  width: 90vw;
  text-align: left;
  z-index: 1002;
`;
const ModalButton = styled.button`
  margin-top: 1.5rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.7em 2em;
  font-size: 1rem;
  cursor: pointer;
`;

type ServiceFormHandle = {
  reset: () => void;
};

const ServiceForm = forwardRef<ServiceFormHandle, ServiceFormProps>(
  ({ fields, onSubmit, submitLabel = "Submit" }, ref) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [values, setValues] = React.useState<Record<string, string>>({});
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [termsAccepted, setTermsAccepted] = React.useState(false);
    const [showPaymentModal, setShowPaymentModal] = React.useState(false);
    const [modalPaymentMethod, setModalPaymentMethod] = React.useState<
      string | null
    >(null);
    const [paymentModalClosed, setPaymentModalClosed] = React.useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValues({});
        if (formRef.current) formRef.current.reset();
      },
    }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      setError("");
      if (e.target.name === "paymentMethod" && e.target.value) {
        setModalPaymentMethod(e.target.value);
        setShowPaymentModal(true);
        setPaymentModalClosed(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      for (const field of fields) {
        if (!values[field.name]) {
          setError("Please fill in all fields.");
          return;
        }
      }
      if (!values.paymentMethod) {
        setError("Please select a payment method.");
        return;
      }
      if (!paymentModalClosed) {
        setError("Please review payment instructions and click Continue.");
        return;
      }
      if (!termsAccepted) {
        setError("You must agree to the Terms and Conditions.");
        return;
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      onSubmit({ ...values, paymentMethod: values.paymentMethod });
    };

    const handleCloseModal = () => {
      setShowPaymentModal(false);
      setPaymentModalClosed(true);
    };

    return (
      <>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} style={{ fontWeight: 600 }}>
                {field.label}
              </label>
              {field.options ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                  style={{
                    padding: "0.7em 1em",
                    borderRadius: 10,
                    border: "1px solid #EEE",
                    width: "100%",
                  }}
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
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
              )}
            </div>
          ))}
          <div>
            <label htmlFor="paymentMethod" style={{ fontWeight: 600 }}>
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={values.paymentMethod || ""}
              onChange={handleChange}
              style={{
                padding: "0.7em 1em",
                borderRadius: 10,
                border: "1px solid #EEE",
                width: "100%",
              }}
            >
              <option value="">Select payment method</option>
              {paymentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {paymentIcons[opt] ? `${paymentIcons[opt]} ` : ""}
                  {opt}
                </option>
              ))}
            </select>
          </div>
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
          {error && (
            <div style={{ color: "#d32f2f", fontSize: 15 }}>{error}</div>
          )}
          <button type="submit" style={{ marginTop: 8 }}>
            {submitLabel}
          </button>
          {success && (
            <div style={{ color: "#388e3c", marginTop: 8 }}>Submitted!</div>
          )}
        </form>
        {showPaymentModal && modalPaymentMethod && (
          <ModalOverlay>
            <ModalCard>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                Payment Instructions
              </div>
              {paymentInstructions[modalPaymentMethod]}
              <ModalButton onClick={handleCloseModal}>Continue</ModalButton>
            </ModalCard>
          </ModalOverlay>
        )}
      </>
    );
  }
);

export default ServiceForm;
