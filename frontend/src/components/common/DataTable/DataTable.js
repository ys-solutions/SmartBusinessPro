"use client";

import { useMemo, useState } from "react";

import TableHeader from "./TableHeader";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function DataTable({

    title,
    subtitle,

    columns = [],
    data = [],

    loading = false,

    searchPlaceholder = "Rechercher...",
    pageSize = 10,

    onCreate,

    renderActions,

}) {

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const filteredData = useMemo(() => {

        if (!search) {

            return data;

        }

        const keyword = search.toLowerCase();

        return data.filter((item) =>

            columns.some((column) => {

                const value = item[column.key];

                return String(value ?? "")
                    .toLowerCase()
                    .includes(keyword);

            })

        );

    }, [search, data, columns]);

    const sortedData = useMemo(() => {

        if (!sortConfig.key) {

            return filteredData;

        }

        return [...filteredData].sort((a, b) => {

            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (valueA == null) return 1;
            if (valueB == null) return -1;

            if (valueA < valueB)
                return sortConfig.direction === "asc" ? -1 : 1;

            if (valueA > valueB)
                return sortConfig.direction === "asc" ? 1 : -1;

            return 0;

        });

    }, [filteredData, sortConfig]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredData.length / pageSize)
    );

    const paginatedData = sortedData.slice(

        (page - 1) * pageSize,

        page * pageSize

    );

    return (

        <div className="bg-white rounded-xl shadow">

            <TableHeader
                title={title}
                subtitle={subtitle}
                onCreate={onCreate}
            />

            <div className="p-6">

                <TableSearch
                    value={search}
                    onChange={(value) => {

                        setSearch(value);

                        setPage(1);

                    }}
                    placeholder={searchPlaceholder}
                />

                <div className="mt-6 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b bg-gray-50">

                                {

                                    columns.map((column) => (

                                        <th
                                            key={column.key}
                                            onClick={() => {

                                                setPage(1);

                                                setSortConfig((current) => ({

                                                    key: column.key,

                                                    direction:

                                                        current.key === column.key &&
                                                        current.direction === "asc"

                                                            ? "desc"

                                                            : "asc",

                                                }));

                                            }}
                                            className="
                                                cursor-pointer
                                                px-4
                                                py-3
                                                text-left
                                                text-sm
                                                font-semibold
                                                text-gray-700
                                                select-none
                                            "
                                        >

                                            <div className="flex items-center gap-2">

                                                {column.label}

                                                {

                                                    sortConfig.key === column.key

                                                        ? (

                                                            sortConfig.direction === "asc"

                                                                ? <ArrowUp size={16}/>

                                                                : <ArrowDown size={16}/>

                                                        )

                                                        : (

                                                            <ArrowUpDown
                                                                size={15}
                                                                className="text-gray-400"
                                                            />

                                                        )

                                                }

                                            </div>

                                        </th>

                                    ))

                                }

                                {

                                    renderActions && (

                                        <th className="w-40 px-4 py-3 text-center">

                                            Actions

                                        </th>

                                    )

                                }

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ? (

                                    <tr>

                                        <td
                                            colSpan={
                                                columns.length +
                                                (renderActions ? 1 : 0)
                                            }
                                            className="py-16 text-center text-gray-500"
                                        >

                                            Chargement...

                                        </td>

                                    </tr>

                                ) : filteredData.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={
                                                columns.length +
                                                (renderActions ? 1 : 0)
                                            }
                                            className="py-16 text-center text-gray-500"
                                        >

                                            Aucune donnée.

                                        </td>

                                    </tr>

                                ) : (

                                    paginatedData.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            {

                                                columns.map((column) => (

                                                    <td
                                                        key={column.key}
                                                        className="px-4 py-4"
                                                    >

                                                        {

                                                            column.render
                                                                ? column.render(item)
                                                                : item[column.key]

                                                        }

                                                    </td>

                                                ))

                                            }

                                            {

                                                renderActions && (

                                                    <td className="px-4 py-4">

                                                        {

                                                            renderActions(item)

                                                        }

                                                    </td>

                                                )

                                            }

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <TablePagination

                page={page}

                totalPages={totalPages}

                onPrevious={() =>
                    setPage((p) => Math.max(1, p - 1))
                }

                onNext={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                }

            />

        </div>

    );

}