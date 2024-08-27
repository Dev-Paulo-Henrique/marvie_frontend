import { useEffect } from "react";

interface TargetProps {
  id: number;
}

export const useCheckbox = (target: TargetProps[]) => {
  useEffect(() => {
    const headerCheckbox = document.getElementById(
      "header-checkbox"
    ) as HTMLInputElement;

    if (headerCheckbox) {
      const handleCheckboxChange = (event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        const rowCheckboxes = document.querySelectorAll(
          ".row-checkbox"
        ) as NodeListOf<HTMLInputElement>;
        rowCheckboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
      };

      headerCheckbox.addEventListener("change", handleCheckboxChange);

      return () => {
        headerCheckbox.removeEventListener("change", handleCheckboxChange);
      };
    }
  }, [target]);
};
