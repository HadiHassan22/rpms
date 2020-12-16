const createStyledComponentFromTemplate = (name) => {
  const newName = name.replace(/^./, name[0].toUpperCase());
  return `import React from "react";
import "./${name}.styled.css";

interface Props {
  /** A text to be displayed in the center of this component */
  title: string;
}

const ${newName} = (props: Props) => {
  const { title } = props;
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

export { ${newName} };
`;
};

module.exports = createStyledComponentFromTemplate;
