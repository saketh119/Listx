import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Product {
    id: string;
    title: string;
    sku: string;
    price: number;
    stock: number;
    status: string;
    category: string;
    image_url?: string;
    platforms: string[];
    ai_score: number;
}

export function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await apiClient.get('/products');
            return response.data.products as Product[];
        },
    });

    const createProductMutation = useMutation({
        mutationFn: async (newProduct: Partial<Product>) => {
            const response = await apiClient.post('/products', newProduct);
            return response.data.product as Product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return {
        products: productsQuery.data || [],
        isLoading: productsQuery.isLoading,
        error: productsQuery.error,
        createProduct: createProductMutation.mutateAsync,
        isCreating: createProductMutation.isPending,
    };
}
