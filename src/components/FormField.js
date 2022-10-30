
const FormField = ({ children, label, labelDirection = "vertical" }) => {
  return (
    <div
      className={`flex ${
        labelDirection === "horizontal"
          ? "flex-row gap-2 items-center"
          : "flex-col"
      }`}
    >
      <p className="label">{label}</p>
      <>{children}</>
    </div>
  );
};

export default FormField;
