"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch  } from "react-hook-form";

import { MemberRegisterSchema } from "@/schemas";
import { registerMember } from "@/actions/registerMember";
import { useSearchParams } from "next/navigation";
import { fetchBarangays, fetchCities, fetchProvinces } from "@/lib/locations";

interface Option {
  label: string;
  value: string;
}
export const MemberRegistrationForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with google!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const genderCategories = [
    { _id: "male", name: "male" },
    { _id: "female", name: "female" },
  ];
  const idCategories = [
    { _id: "National ID", name: "National ID" },
    { _id: "Passport", name: "Passport" },
    { _id: "Drivers License", name: "Drivers License" },
    { _id: "Philhealth ID", name: "Philhealth ID" },
    { _id: "Student ID", name: "Student ID" },
    { _id: "Birth Reference Number", name: "Birth Reference Number" },
  ];

  const form = useForm<z.infer<typeof MemberRegisterSchema>>({
    resolver: zodResolver(MemberRegisterSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      phone: undefined,
      barangay: undefined,
      cityState: undefined,
      province: undefined,
      gender: undefined,
      id: undefined,
      idType: undefined,
      dob: undefined,
    },
  });

  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [barangayOptions, setBarangayOptions] = useState<Option[]>([]);

  useEffect(() => {
    const loadProvinces = async () => {
      const provinces = await fetchProvinces();
      setProvinceOptions(
        provinces.map((province: any) => ({
          label: province.name,
          value: province.code,
        }))
      );
    };
    loadProvinces();
  }, []);

  const onSubmit = (values: z.infer<typeof MemberRegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerMember(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const selectedProvince = form.watch("province");
  const selectedCity = form.watch("cityState");
  const calculateAge = (dob:any) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    if (selectedProvince) {
      const loadCities = async () => {
        const cities = await fetchCities(selectedProvince);
        setCityOptions(
          cities.map((city: any) => ({ label: city.name, value: city.code, }))
        );
        setBarangayOptions([]);
        form.setValue("cityState", "");
        form.setValue("barangay", "");
      };
      loadCities();
    } else {
      setCityOptions([]);
      setBarangayOptions([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      const loadBarangays = async () => {
        const barangays = await fetchBarangays(selectedCity);
        setBarangayOptions(
          barangays.map((barangay: any) => ({
            label: barangay.name,
            value: barangay.code,
          }))
        );
        form.setValue("barangay", "");
      };
      loadBarangays();
    } else {
      setBarangayOptions([]);
    }
  }, [selectedCity]);


  const dob = useWatch({ control: form.control, name: "dob" });

  useEffect(() => {
    if (dob) {
      const age = calculateAge(dob);
      form.setValue("age", age);
    }
  }, [dob]);

  
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full "
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your phone number..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 overflow-y-auto">
                      {/* @ts-ignore  */}
                      {genderCategories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="mother"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Mother</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your Name of Mother..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="father"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Father</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your Name of Father..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter your Birthday..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Province"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 overflow-y-auto">
                      {provinceOptions.map((province) => (
                        <SelectItem key={province.value} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Municipality</FormLabel>
                  <Select
                    disabled={isPending || !selectedProvince}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select City/Municipality"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 overflow-y-auto">
                      {cityOptions.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <Select
                    disabled={isPending || !selectedCity}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Barangay"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 overflow-y-auto">
                      {barangayOptions.map((barangay) => (
                        <SelectItem key={barangay.value} value={barangay.value}>
                          {barangay.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Type</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Type of ID"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {idCategories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID NUMBER</FormLabel>
                  <FormControl>
                    <Input
                      type="id"
                      placeholder="Enter your id number..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            className="w-full text-zinc-900 bg-green-400 hover:bg-green-900 hover:text-white"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
