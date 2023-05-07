import { Link } from "react-router-dom";

export const AccountRecoveryForm = () => {
  return (
    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
      <div>
        <label htmlFor="email" className="form-label">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-input"
          placeholder="name@company.com"
          required
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="form-checkbox"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="form-checkbox-label">
            I accept the{" "}
            <Link to="/signup" className="form-link">
              Terms and Conditions
            </Link>
          </label>
        </div>
      </div>
      <button type="submit" className="w-full btn-primary">
        Reset password
      </button>
    </form>
  );
};
