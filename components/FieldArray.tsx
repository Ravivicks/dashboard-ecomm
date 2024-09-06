// FieldArrayComponent.tsx
import React from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Adjust the import based on your project structure
import { Button } from "@/components/ui/button"; // Adjust the import based on your project structure
import { FormLabel, FormControl } from "@/components/ui/form"; // Adjust the import based on your project structure
import { CrossIcon, Trash, X } from "lucide-react";
import { useSlideOpen } from "@/hooks/use-slide-open";

type Props = {
  control: Control<any>; // Adjust the type based on your form values
  disabled?: boolean;
};

const FieldArrayComponent: React.FC<Props> = ({ control, disabled }) => {
  const { onClose } = useSlideOpen();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sliderImages", // This must match the name in the parent
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <FormLabel>Slider Images</FormLabel>
        <X
          className="size-4 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="space-y-2 mt-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <FormControl>
              <Input
                disabled={disabled}
                placeholder="Slider Image URL"
                {...control.register(`sliderImages.${index}` as const)} // Ensure correct registration
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              onClick={() => remove(index)}
              disabled={disabled}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append("")} // Append an empty string to sliderImages
          disabled={disabled}
        >
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default FieldArrayComponent;
