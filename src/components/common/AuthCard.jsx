import LinkUpLogoImage from "../../assets/linkup-logo.jpg";

export function AuthCard({ children }) {
  return (
    <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br absolute inset-0 bg-aurora">
      <div className="relative z-10 w-full max-h-full max-w-md mx-4">
        <div className="bg-white/95 rounded-2xl shadow-2xl px-6 pt-6 border border-white/20">
          <div className="flex justify-center pb-4">
            <img src={LinkUpLogoImage} alt="LinkUp Logo" className="w-24 h-24" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}