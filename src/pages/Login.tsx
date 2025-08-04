// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Eye, EyeOff, CreditCard } from "lucide-react";

// import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "@/hooks/use-toast";
// import bankingHero from "@/assets/banking-hero.jpg";

// const loginSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   rememberMe: z.boolean().optional(),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const rememberMe = watch("rememberMe");

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     try {
//       await login({
//         username: data.username,
//         password: data.password,
//       });
//       toast({
//         title: "Welcome back!",
//         description: "You have successfully signed in to your account.",
//       });
//       navigate("/dashboard");
//     } catch (error) {
//       toast({
//         title: "Login failed",
//         description: "Invalid username or password. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Hero Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative">
//         <img
//           src={bankingHero}
//           alt="Modern Banking"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/80" />
//         <div className="relative z-10 flex flex-col justify-center p-12 text-white">
//           <div className="flex items-center space-x-3 mb-8">
//             <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
//               <CreditCard className="w-7 h-7" />
//             </div>
//             <h1 className="text-3xl font-bold">SecureBank</h1>
//           </div>
//           <h2 className="text-4xl font-bold mb-4">
//             Your Financial Future Starts Here
//           </h2>
//           <p className="text-xl text-white/90 mb-8">
//             Experience secure, modern banking with our comprehensive digital platform.
//             Manage your accounts, transfer money, and track your finances with ease.
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 rounded-full bg-white" />
//               <span className="text-white/90">Bank-level security</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 rounded-full bg-white" />
//               <span className="text-white/90">24/7 customer support</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 rounded-full bg-white" />
//               <span className="text-white/90">Instant transfers</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-background">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center lg:hidden">
//             <div className="flex items-center justify-center space-x-3 mb-6">
//               <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
//                 <CreditCard className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold">SecureBank</h1>
//             </div>
//           </div>

//           <Card className="banking-card border-0">
//             <CardHeader className="space-y-1">
//               <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
//               <CardDescription>
//                 Enter your credentials to access your banking dashboard
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="username">Username or Email</Label>
//                   <Input
//                     id="username"
//                     type="text"
//                     placeholder="Enter your username or email"
//                     className="banking-input"
//                     {...register("username")}
//                   />
//                   {errors.username && (
//                     <p className="text-sm text-destructive">{errors.username.message}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       className="banking-input pr-10"
//                       {...register("password")}
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                   {errors.password && (
//                     <p className="text-sm text-destructive">{errors.password.message}</p>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="rememberMe"
//                       checked={rememberMe}
//                       onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
//                     />
//                     <Label htmlFor="rememberMe" className="text-sm">
//                       Remember me
//                     </Label>
//                   </div>
//                   <Link
//                     to="/forgot-password"
//                     className="text-sm text-primary hover:underline"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full banking-button-primary"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Signing in..." : "Sign In"}
//                 </Button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-muted-foreground">
//                   Don't have an account?{" "}
//                   <Link to="/register" className="text-primary hover:underline font-medium">
//                     Create account
//                   </Link>
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           <p className="text-xs text-center text-muted-foreground">
//             By signing in, you agree to our{" "}
//             <Link to="/terms" className="underline">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link to="/privacy" className="underline">
//               Privacy Policy
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, CreditCard } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import bankingHero from "@/assets/banking-hero.jpg";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to your account.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ...Hero section remains unchanged... */}

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* ...mobile logo section unchanged... */}
          <Card className="banking-card border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your banking dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="banking-input"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="banking-input pr-10"
                      {...register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setValue("rememberMe", !!checked)
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full banking-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
