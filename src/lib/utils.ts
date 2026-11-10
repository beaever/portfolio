import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// globals.css @theme 의 유동 타입 스케일. 등록하지 않으면 색상 클래스로 오인해 지워 버린다.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "title", "heading", "subheading", "lead", "body", "small", "caption"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
