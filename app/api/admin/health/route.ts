import { getMongoDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({
      ok: false,
      database: "not_configured",
      message: "Set MONGODB_URI in .env.local to enable MongoDB.",
    });
  }

  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });

    return Response.json({
      ok: true,
      database: db.databaseName,
    });
  } catch {
    return Response.json(
      {
        ok: false,
        database: "unreachable",
        message: "MongoDB connection failed.",
      },
      { status: 500 },
    );
  }
}
