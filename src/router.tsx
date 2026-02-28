import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { SimpleLayout } from "./components/layouts/SimpleLayout";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { default as App } from "./App";
import NotFound from "./pages/system/NotFound";
import Maintenance from "./pages/system/Maintenance";
import NotificationCenter from "./pages/system/NotificationCenter";
import ProductsList from "./pages/products/ProductsList";
import UploadMethod from "./pages/products/UploadMethod";
import UploadCSV from "./pages/products/UploadCSV";
import ManualEntry from "./pages/products/ManualEntry";
import AIProcessing from "./pages/products/AIProcessing";
import AIPreview from "./pages/products/AIPreview";
import PlatformMapping from "./pages/products/PlatformMapping";
import PublishProducts from "./pages/products/PublishProducts";
import PublishSuccess from "./pages/products/PublishSuccess";
import ProductDetail from "./pages/products/ProductDetail";
import InventoryList from "./pages/inventory/InventoryList";

import OrdersList from "./pages/orders/OrdersList";
import OrderDetail from "./pages/orders/OrderDetail";
import OrderEdit from "./pages/orders/OrderEdit";

import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
import ActiveShipments from "./pages/logistics/ActiveShipments";
import ShipmentTracker from "./pages/logistics/ShipmentTracker";
import ReturnsList from "./pages/logistics/ReturnsList";
import ReturnDetail from "./pages/logistics/ReturnDetail";
import FailedDeliveries from "./pages/logistics/FailedDeliveries";
import BulkAssignCourier from "./pages/logistics/BulkAssignCourier";
import PickupScheduling from "./pages/logistics/PickupScheduling";

import IntegrationsOverview from "./pages/integrations/IntegrationsOverview";
import PlatformConnectFlow from "./pages/integrations/PlatformConnectFlow";
import LogisticsConnectFlow from "./pages/integrations/LogisticsConnectFlow";

import AIContentGenerator from "./pages/ai-studio/AIContentGenerator";
import AIBulkRegenerate from "./pages/ai-studio/AIBulkRegenerate";
import AIImageEnhancement from "./pages/ai-studio/AIImageEnhancement";
import AISEOKeywords from "./pages/ai-studio/AISEOKeywords";

import AnalyticsOverview from "./pages/analytics/AnalyticsOverview";
import SalesReport from "./pages/analytics/SalesReport";
import InventoryReport from "./pages/analytics/InventoryReport";
import LogisticsReport from "./pages/analytics/LogisticsReport";
import ReturnsReport from "./pages/analytics/ReturnsReport";
import SEOReport from "./pages/analytics/SEOReport";

import ProfileSettings from "./pages/settings/ProfileSettings";
import TeamSettings from "./pages/settings/TeamSettings";
import BillingSettings from "./pages/settings/BillingSettings";
import APIKeysSettings from "./pages/settings/APIKeysSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";

import CustomersList from "./pages/customers/CustomersList";
import CustomerDetail from "./pages/customers/CustomerDetail";
import CustomerSegments from "./pages/customers/CustomerSegments";

import SupportDashboard from "./pages/support/SupportDashboard";
import TicketsList from "./pages/support/TicketsList";
import TicketDetail from "./pages/support/TicketDetail";
import KnowledgeBase from "./pages/support/KnowledgeBase";

import { LandingPage } from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SignupStep2 from "./pages/auth/SignupStep2";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import OnboardingWelcome from "./pages/onboarding/OnboardingWelcome";
import ConnectPlatforms from "./pages/onboarding/ConnectPlatforms";
import ConnectLogistics from "./pages/onboarding/ConnectLogistics";

import Dashboard from "./pages/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                element: <AuthLayout />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "signup", element: <Signup /> },
                ]
            },
            {
                element: <SimpleLayout />,
                children: [
                    { path: "signup/step-2", element: <SignupStep2 /> },
                    { path: "verify-email", element: <EmailVerification /> },
                    { path: "forgot-password", element: <ForgotPassword /> },
                    { path: "reset-password", element: <ResetPassword /> },
                ]
            },
            { path: "onboarding/welcome", element: <OnboardingWelcome /> },
            { path: "onboarding/platforms", element: <ConnectPlatforms /> },
            { path: "onboarding/logistics", element: <ConnectLogistics /> },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "products", element: <ProductsList /> },
                    { path: "products/upload", element: <UploadMethod /> },
                    { path: "products/upload/csv", element: <UploadCSV /> },
                    { path: "products/upload/manual", element: <ManualEntry /> },
                    { path: "products/upload/ai", element: <AIProcessing /> },
                    { path: "products/publish", element: <PlatformMapping /> },
                    { path: "products/ai-preview", element: <AIPreview /> },
                    { path: "products/publish-select", element: <PublishProducts /> },
                    { path: "products/publish-success", element: <PublishSuccess /> },
                    { path: "products/:id", element: <ProductDetail /> },
                    { path: "inventory", element: <InventoryList /> },
                    // Orders
                    { path: "orders", element: <OrdersList /> },
                    { path: "orders/:id", element: <OrderDetail /> },
                    { path: "orders/:id/edit", element: <OrderEdit /> },
                    // Logistics
                    { path: "logistics", element: <LogisticsDashboard /> },
                    { path: "logistics/shipments", element: <ActiveShipments /> },
                    { path: "logistics/shipments/:awb", element: <ShipmentTracker /> },
                    { path: "logistics/returns", element: <ReturnsList /> },
                    { path: "logistics/returns/:id", element: <ReturnDetail /> },
                    { path: "logistics/failed", element: <FailedDeliveries /> },
                    { path: "logistics/bulk-assign", element: <BulkAssignCourier /> },
                    { path: "logistics/pickup-scheduling", element: <PickupScheduling /> },
                    // Integrations
                    { path: "integrations", element: <IntegrationsOverview /> },
                    { path: "integrations/connect/:platformId", element: <PlatformConnectFlow /> },
                    { path: "integrations/connect-logistics/:partnerId", element: <LogisticsConnectFlow /> },
                    // AI Studio
                    { path: "ai-studio", element: <AIContentGenerator /> },
                    { path: "ai-studio/bulk", element: <AIBulkRegenerate /> },
                    { path: "ai-studio/image-enhancement", element: <AIImageEnhancement /> },
                    { path: "ai-studio/seo-keywords", element: <AISEOKeywords /> },
                    // Analytics
                    { path: "analytics", element: <AnalyticsOverview /> },
                    { path: "analytics/sales", element: <SalesReport /> },
                    { path: "analytics/inventory", element: <InventoryReport /> },
                    { path: "analytics/logistics", element: <LogisticsReport /> },
                    { path: "analytics/returns", element: <ReturnsReport /> },
                    { path: "analytics/seo", element: <SEOReport /> },
                    // Settings
                    { path: "settings", element: <ProfileSettings /> },
                    { path: "settings/team", element: <TeamSettings /> },
                    { path: "settings/billing", element: <BillingSettings /> },
                    { path: "settings/api-keys", element: <APIKeysSettings /> },
                    { path: "settings/notifications", element: <NotificationSettings /> },
                    // Customers
                    { path: "customers", element: <CustomersList /> },
                    { path: "customers/segments", element: <CustomerSegments /> },
                    { path: "customers/:id", element: <CustomerDetail /> },
                    // Support
                    { path: "support", element: <SupportDashboard /> },
                    { path: "support/tickets", element: <TicketsList /> },
                    { path: "support/tickets/:id", element: <TicketDetail /> },
                    { path: "support/knowledge-base", element: <KnowledgeBase /> },
                ]
            },
            {
                path: "notifications",
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <NotificationCenter /> }
                ]
            },
            { path: "maintenance", element: <Maintenance /> },
            { path: "*", element: <NotFound /> },
        ]
    }
]);
