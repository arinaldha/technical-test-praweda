"use client";
import { Button, Card, Image, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function MaskingComponent() {
  const router = useRouter();
  return (
    <div>
      <Image
        alt="example"
        src="./images/illustrations/forgot-password.png"
        width={328}
        height={328}
        preview={false}
        style={{
          borderRadius: 8,
        }}
      />
      <div
        style={{
          padding: 8,
        }}
      />
      <h4>Check Your Email</h4>
      <div
        style={{
          padding: 8,
        }}
      />
      <Typography.Text type="secondary">
        Instruction has been sent to your email address
      </Typography.Text>
      <div className="action-button">
        <div className="submit-btn">
          <Button onClick={() => router.push("/auth/login")} style={{ width: 328 }}>
            Back to Login Page
          </Button>
        </div>
      </div>
    </div>
  );
}
