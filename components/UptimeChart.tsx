'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts'

interface LogEntry {
  checkedAt: Date
  status: boolean
  responseTime: number | null
  httpStatus: number | null
}

interface UptimeChartProps {
  logs: LogEntry[]
  type?: 'uptime' | 'response'
}

export function UptimeChart({ logs, type = 'uptime' }: UptimeChartProps) {
  if (logs.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    )
  }

  const chartData = logs.map(log => ({
    time: log.checkedAt.getTime(),
    status: log.status ? 1 : 0,
    response: log.responseTime ?? 0,
  }))

  if (type === 'response') {
    return (
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={unix => new Date(unix).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              angle={-45}
              textAnchor="end"
              stroke="#9ca3af"
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              labelFormatter={unix => new Date(unix).toLocaleString()}
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f3f4f6' }}
            />
            <Line
              type="monotone"
              dataKey="response"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Default: uptime area chart
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={unix => new Date(unix).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            angle={-45}
            textAnchor="end"
            stroke="#9ca3af"
          />
          <YAxis domain={[0, 1]} ticks={[0, 1]} tickFormatter={v => (v === 1 ? 'UP' : 'DOWN')} stroke="#9ca3af" />
          <Tooltip
            labelFormatter={unix => new Date(unix).toLocaleString()}
            formatter={(val?: number) => [val === 1 ? 'UP' : 'DOWN', 'Status']}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f3f4f6' }}
          />
          <defs>
            <linearGradient id="upColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area
            type="stepAfter"
            dataKey="status"
            stroke="#10b981"
            fill="url(#upColor)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}