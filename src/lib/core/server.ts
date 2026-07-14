import { redirect } from "next/navigation";
import { getUserToken } from "./session";
import { Product } from "@/types/product";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeaders = async (): Promise<HeadersInit> => {
  const token = await getUserToken();

  const headers: HeadersInit = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  return headers;
};

export const publicFetch = async (apiUrl: string): Promise<Response> => {
  const res = await fetch(`${baseURL}/${apiUrl}`);
  return res;
};

export const protectedFetch = async (apiUrl: string): Promise<Response> => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    headers: await authHeaders(),
  });
  return res;
};



export const serverAction = async (apiUrl: string, data:Partial<Product>) => {


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(data),
  });

  return handleProtectedStatus(res);
};
export const serverUpdate = async (apiUrl: string, data:Partial<Product>) => {


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(data),
  });

  return handleProtectedStatus(res);
};

export const serverDelete = async (apiUrl: string): Promise<Response> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
  });
  return handleProtectedStatus(res);
};


export const handleProtectedStatus = async (res: Response) => {
  if (res?.status === 401) {
    redirect("/auth/login");
  } else if (res.status === 403) {
    redirect("/unauthorize");
  }
  return res.json();
};
