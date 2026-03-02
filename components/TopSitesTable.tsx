import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const topSites = [
  {
    rank: "1",
    websiteUrl: "Youtube.com",
    status: "Active",
  },
  {
    rank: "2",
    websiteUrl: "Google.com",
    status: "Active",
  },
  {
    rank: "3",
    websiteUrl: "Facebook.com",
    status: "Active",
  },
  {
    rank: "4",
    websiteUrl: "X.com",
    status: "Active",
  },
  {
    rank: "5",
    websiteUrl: "Yahoo.com",
    status: "Active",
  },
  {
    rank: "6",
    websiteUrl: "Pinterest.com",
    status: "Inactive",
  },
  {
    rank: "7",
    websiteUrl: "Instagram.com",
    status: "Active",
  },
  {
    rank: "8",
    websiteUrl: "Reddit.com",
    status: "Inactive",
  },
  {
    rank: "9",
    websiteUrl: "Linkedin.com",
    status: "Active",
  },
  {
    rank: "10",
    websiteUrl: "TikTok.com",
    status: "Active",
  },
  {
    rank: "11",
    websiteUrl: "Youtube.com",
    status: "Active",
  },
  {
    rank: "12",
    websiteUrl: "Google.com",
    status: "Active",
  },
  {
    rank: "13",
    websiteUrl: "Facebook.com",
    status: "Active",
  },
  {
    rank: "14",
    websiteUrl: "X.com",
    status: "Active",
  },
  {
    rank: "15",
    websiteUrl: "Yahoo.com",
    status: "Active",
  },
  {
    rank: "16",
    websiteUrl: "Pinterest.com",
    status: "Inactive",
  },
  {
    rank: "17",
    websiteUrl: "Instagram.com",
    status: "Active",
  },
  {
    rank: "18",
    websiteUrl: "Reddit.com",
    status: "Inactive",
  },
  {
    rank: "19",
    websiteUrl: "Linkedin.com",
    status: "Active",
  },
  {
    rank: "20",
    websiteUrl: "TikTok.com",
    status: "Active",
  },
];

export function TopSitesTable() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
        <h2 className="text-4xl font-bold mb-4 text-center">
            Top 20 Websites Status
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
          {topSites.map((topSite) => (
            <TableRow key={topSite.rank}>
              <TableCell className="font-medium">{topSite.rank}</TableCell>
              <TableCell>{topSite.websiteUrl}</TableCell>
              <TableCell
                className={`font-medium ${topSite.status === "Active" ? "text-green-500" : "text-red-500"}`}
              >
                {topSite.status}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/details/${topSite.rank}`}
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
