
const GamificationTableIAMRoleStatement = {
    Effect: "Allow",
    Action: [
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
    ],
    Resource: [
        { "Fn::GetAtt": ["GamificationTable", "Arn"] },
        { "Fn::Join": ["/", [{ "Fn::GetAtt": ["GamificationTable", "Arn"] }, 'index', 'GamificationsUserIdIndex']] }
    ]



}


export { GamificationTableIAMRoleStatement };