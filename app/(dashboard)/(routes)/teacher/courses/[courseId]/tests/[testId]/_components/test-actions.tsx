"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface TestActionsProps {
  disabled: boolean;
  courseId: string;
  testId: string;
  isPublished: boolean;
}

export const TestActions = ({
  disabled,
  courseId,
  testId,
  isPublished,
}: TestActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/tests/${testId}/unpublish`);
        toast.success("Розділ деактивовано");
      } else {
        await axios.patch(`/api/courses/${courseId}/tests/${testId}/publish`);
        toast.success("Розділ опубліковано");
      }

      router.refresh();
    } catch {
      toast.error("Упс! Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/tests/${testId}`);
      toast.success("Тест видалено");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Ой! Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Деактивувати" : "Опублікувати"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
