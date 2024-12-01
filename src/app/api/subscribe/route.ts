import { admin } from '../libs/firebaseAdmin'; // Import Firebase Admin SDK
import { NextResponse } from 'next/server'; // ใช้ NextResponse แทน res สำหรับ App Router

export async function POST(req: Request) {
  try {
    // รับข้อมูลจาก body
    const { token, topic } = await req.json();

    // สมัครหัวข้อ
    await admin.messaging().subscribeToTopic(token, topic);

    // ส่ง Response กลับ
    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error) {
    // ส่ง error response ถ้ามีปัญหากับการสมัคร
    return NextResponse.json({ error: 'Error subscribing to topic', details: error }, { status: 500 });
  }
}
