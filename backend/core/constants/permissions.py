class Permissions:

    # ==========================================
    # DASHBOARD
    # ==========================================

    DASHBOARD_VIEW = "dashboard.dashboard.view"

    # ==========================================
    # UTILISATEURS
    # ==========================================

    USER_VIEW = "accounts.user.view"
    USER_CREATE = "accounts.user.create"
    USER_UPDATE = "accounts.user.update"
    USER_DELETE = "accounts.user.delete"

    # ==========================================
    # ROLES
    # ==========================================

    ROLE_VIEW = "accounts.role.view"
    ROLE_CREATE = "accounts.role.create"
    ROLE_UPDATE = "accounts.role.update"
    ROLE_DELETE = "accounts.role.delete"

    # ==========================================
    # PERMISSIONS
    # ==========================================

    PERMISSION_VIEW = "accounts.permission.view"
    PERMISSION_CREATE = "accounts.permission.create"
    PERMISSION_UPDATE = "accounts.permission.update"
    PERMISSION_DELETE = "accounts.permission.delete"

    CLIENT_VIEW = "crm.client.view"
    CLIENT_CREATE = "crm.client.create"
    CLIENT_UPDATE = "crm.client.update"
    CLIENT_DELETE = "crm.client.delete"
    CLIENT_VALIDATE = "crm.client.validate"

    PRODUCT_VIEW = "inventory.product.view"
    PRODUCT_CREATE = "inventory.product.create"
    PRODUCT_UPDATE = "inventory.product.update"
    PRODUCT_DELETE = "inventory.product.delete"

    CATEGORY_VIEW = "inventory.category.view"
    CATEGORY_CREATE = "inventory.category.create"
    CATEGORY_UPDATE = "inventory.category.update"
    CATEGORY_DELETE = "inventory.category.delete"

    ACCOUNT_VIEW = "finance.account.view"
    ACCOUNT_CREATE = "finance.account.create"
    ACCOUNT_UPDATE = "finance.account.update"
    ACCOUNT_DELETE = "finance.account.delete"

    TRANSACTION_VIEW = "finance.transaction.view"
    TRANSACTION_CREATE = "finance.transaction.create"
    TRANSACTION_VALIDATE = "finance.transaction.validate"

    EMPLOYEE_VIEW = "hr.employee.view"
    EMPLOYEE_CREATE = "hr.employee.create"
    EMPLOYEE_UPDATE = "hr.employee.update"
    EMPLOYEE_DELETE = "hr.employee.delete"