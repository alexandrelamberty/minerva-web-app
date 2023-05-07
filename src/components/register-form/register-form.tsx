import { Link } from "react-router-dom";

export const FormRegister = () => {
  return (
    <form className="space-y-4 md:space-y-6" action="#">
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
      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="form-input"
          required
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="form-label">
          Confirm password
        </label>
        <input
          type="confirm-password"
          name="confirm-password"
          id="confirm-password"
          placeholder="••••••••"
          className="form-input"
          required
        />
      </div>
      {/* <div className="flex items-start">
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
            <a
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div> */}
      <button type="submit" className="w-full btn-primary">
        Create an account
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="form-link">
          Login here
        </Link>
      </p>
    </form>
  );
};
