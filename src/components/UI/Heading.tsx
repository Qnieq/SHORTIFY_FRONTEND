import { forwardRef } from "react";

interface IHeading {
    text: string;
    color: string;
    weight?: string
    align?: "center" | "left" | "right"
}

export const Heading = forwardRef<HTMLHeadingElement, IHeading>(
    ({ text, color, weight, align }, ref) => {
        return (
            <h1
                ref={ref}
                style={{
                    color: color,
                    fontSize: "clamp(2rem, 6vw, 6rem)",
                    fontWeight: weight,
                    textAlign: align
                }}
                className={`font-poppins`}
            >
                {text}
            </h1>
        );
    }
);
