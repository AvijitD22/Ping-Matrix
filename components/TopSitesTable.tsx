import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// const topSites = [
//   {
//     rank: "1",
//     websiteUrl: "Youtube.com",
//     status: "Active",
//   },
//   {
//     rank: "2",
//     websiteUrl: "Google.com",
//     status: "Active",
//   },
//   {
//     rank: "3",
//     websiteUrl: "Facebook.com",
//     status: "Active",
//   },
//   {
//     rank: "4",
//     websiteUrl: "X.com",
//     status: "Active",
//   },
//   {
//     rank: "5",
//     websiteUrl: "Yahoo.com",
//     status: "Active",
//   },
//   {
//     rank: "6",
//     websiteUrl: "Pinterest.com",
//     status: "Inactive",
//   },
//   {
//     rank: "7",
//     websiteUrl: "Instagram.com",
//     status: "Active",
//   },
//   {
//     rank: "8",
//     websiteUrl: "Reddit.com",
//     status: "Inactive",
//   },
//   {
//     rank: "9",
//     websiteUrl: "Linkedin.com",
//     status: "Active",
//   },
//   {
//     rank: "10",
//     websiteUrl: "TikTok.com",
//     status: "Active",
//   },
//   {
//     rank: "11",
//     websiteUrl: "Youtube.com",
//     status: "Active",
//   },
//   {
//     rank: "12",
//     websiteUrl: "Google.com",
//     status: "Active",
//   },
//   {
//     rank: "13",
//     websiteUrl: "Facebook.com",
//     status: "Active",
//   },
//   {
//     rank: "14",
//     websiteUrl: "X.com",
//     status: "Active",
//   },
//   {
//     rank: "15",
//     websiteUrl: "Yahoo.com",
//     status: "Active",
//   },
//   {
//     rank: "16",
//     websiteUrl: "Pinterest.com",
//     status: "Inactive",
//   },
//   {
//     rank: "17",
//     websiteUrl: "Instagram.com",
//     status: "Active",
//   },
//   {
//     rank: "18",
//     websiteUrl: "Reddit.com",
//     status: "Inactive",
//   },
//   {
//     rank: "19",
//     websiteUrl: "Linkedin.com",
//     status: "Active",
//   },
//   {
//     rank: "20",
//     websiteUrl: "TikTok.com",
//     status: "Active",
//   },
// ];

type WebsiteStatus = {
  url: string;
  found: boolean;
  lastStatus: boolean;
  httpStatus: number;
  responseTimeMs: number;
  checkedAt: string;
  websiteId: string;
};

async function fetchTopSites(): Promise<{ results: WebsiteStatus[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/last-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: [
        "https://www.google.com",
        "https://amazon.com/",
        "https://www.youtube.com/",
        "https://www.facebook.com/",
        "https://www.x.com/",
        "https://www.yahoo.com/",
        "https://www.pinterest.com/",
        "https://www.instagram.com/",
        "https://www.reddit.com/",
        "https://www.linkedin.com/",
      ],
    }),
    cache: "no-store", // important for live data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch top sites");
  }

  return res.json(); // VERY IMPORTANT
}

export async function TopSitesTable() {
  let data = await fetchTopSites();
  // console.log("Fetched top sites data:", data); // Debug log

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h2 className="text-5xl font-bold mb-4 text-center">
        Top 10 Websites Status
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((website, index) => (
            <TableRow key={website.websiteId} className="h-14">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{website.url}</TableCell>
              <TableCell
                className={`font-medium ${website.lastStatus ? "text-green-500" : "text-red-500"}`}
              >
                {website.lastStatus ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/details/${encodeURIComponent(website.url)}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
