/**
 * SectionHeader
 * @param param0
 * @returns
 */
const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="p-4">
      <h1
        className="text-slate-800 dark:text-slate-100 text-lg"
        data-testid="title"
      >
        {title}
      </h1>
    </div>
  );
};

export default SectionHeader;
