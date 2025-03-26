import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;

    // Redirect user to main page when logged in
    // const protectedRoutes = ["/login", "/signup"];
    // if (token !== null && protectedRoutes.includes(request.nextUrl.pathname)) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    // Renew session cookie when token exists
    if (token !== null) {
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  }

  // Prevent CSRF attacks
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, { status: 403 });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, { status: 403 });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
};
