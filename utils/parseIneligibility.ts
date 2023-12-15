import { ClaimEligibility } from "@thirdweb-dev/sdk";

export function parseIneligibility(
  reasons: ClaimEligibility[],
  quantity = 0
): string {
  if (!reasons.length) {
    return "";
  }

  const reason = reasons[0];
  let nbsp = "\u00A0"

  if (
    reason === ClaimEligibility.Unknown ||
    reason === ClaimEligibility.NoActiveClaimPhase ||
    reason === ClaimEligibility.NoClaimConditionSet
  ) {
    return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} ${nbsp} Loading.. ${nbsp} ${nbsp}   ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} `;
  } else if (reason === ClaimEligibility.NotEnoughTokens) {
    return "You don't have enough currency to mint.";
  } else if (reason === ClaimEligibility.AddressNotAllowed) {
    if (quantity > 1) {
      return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} ${nbsp} Claimed  ${nbsp} ${nbsp} ${nbsp}   ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp}`
    }

    return `${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp} ${nbsp} Claimed  ${nbsp} ${nbsp} ${nbsp}   ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp} ${nbsp}  ${nbsp} ${nbsp}  ${nbsp}`
  }

  return reason;
}
