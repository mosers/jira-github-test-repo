import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
import { IPallet, palletType } from "../types";

const GET_PALLETS = gql`
  query getPallets($query: String!) {
    pallets(search: $query)
      @rest(
        path: "/pallets?query={args.search}"
        method: "GET"
        type: "${palletType}"
        endpoint: "v1"
      ) {
      id
    }
  }
`;

interface IResponse {
  pallets: IPallet[];
}

interface IProps {
  query: string;
}

interface IVariables {
  query: string;
}

type ChildProps = ChildDataProps<IProps, IResponse, IVariables>;

export const withPallets = graphql<IProps, IResponse, IVariables, ChildProps>(
  GET_PALLETS,
  {
    options: ({ query }) => ({
      variables: { query },
    }),
  },
);
