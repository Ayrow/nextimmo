export type EventTargetType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type HandleInputChangeType = (
  event:
    | React.ChangeEvent<EventTargetType>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;
