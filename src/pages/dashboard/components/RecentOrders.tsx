import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { Spinner } from "@/components/ui/spinner";

export function RecentOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'success';
            case 'processing': return 'info';
            case 'shipped': return 'default';
            case 'pending': case 'new': return 'warning';
            case 'cancelled': case 'returned': return 'error';
            default: return 'neutral';
        }
    }

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const response = await apiClient.get('/orders');
                setOrders(response.data.orders.slice(0, 5)); // Only show top 5 on dashboard
            } catch (error) {
                console.error("Failed to fetch recent orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentOrders();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                        <Spinner size="md" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium text-xs font-mono">{order.id}</TableCell>
                                        <TableCell>{order.customer_name || 'N/A'}</TableCell>
                                        <TableCell className="capitalize">{order.platform}</TableCell>
                                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>₹{Number(order.total).toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-text-muted">
                                        No recent orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
