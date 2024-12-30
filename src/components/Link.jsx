import { twMerge } from "tailwind-merge";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ href, isExternal, className, ...props }) => {
  const tw = "text-foreground flex hover:text-primary hover:underline";
  return (
    <>
      {isExternal ? (
        <a
          href={href}
          className={twMerge(tw, className)}
          {...props}
          target={"_blank"}
        />
      ) : (
        <RouterLink to={href} className={twMerge(tw, className)} {...props} />
      )}
    </>
  );
};

export default Link;
