type ActionMenuProps = {
  title: string;
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
};

/**
 * ActionMenu is container that display the title for a section and provide a
 * container to add content.
 *
 * <ActionMenu title="Testing">
 *   <button>Content</button>
 * </ActionMenu>
 *
 * @param param0
 * @returns
 */
export const ActionMenu = ({ icon, title, children }: ActionMenuProps) => {
  return (
    <div className="pb-4 flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-4 border-b border-slate-300 dark:border-slate-700">
      {/* <div className="flex items-center">
        <div className="aspect-auto">{icon}</div>
      </div> */}
      <h1
        className="text-blue-500 dark:text-blue-200 text-lg"
        data-testid="title"
      >
        {title}
      </h1>
      <div className="flex flex-row space-x-2">{children}</div>
    </div>
  );
};
