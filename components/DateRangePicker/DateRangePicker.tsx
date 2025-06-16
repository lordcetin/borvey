// components/DatePicker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { tr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // shadcn'nin calendar'ı

interface DatePickerProps {
  onTimestampChange: (timestamp: number) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onTimestampChange }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onTimestampChange(selectedDate.getTime());
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-40 h-10 justify-start text-left font-normal cursor-pointer ${
            !date && "text-muted-foreground"
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 z-[9999999]" align="center">
        <Calendar
          mode="single"
          selected={date}
          locale={tr}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
